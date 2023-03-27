import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';
// import 'QuizScreenStyle.scss'
import { que as questions } from '../assets/dummyData';
import isEmpty from '../utils/isEmpty';
import { Navigate } from 'react-router-dom';

class QuizScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            selectedAnswer: '',
            previousRandomNumbers: [],
            time: {}
        };
        this.interval = null;

    }
   

    componentDidMount() {
       
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion?.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
                this.handleDisableButton();
            });
        }
    };

    handleOptionClick = (e) => {
        console.log(e.target.innerHTML)
        console.log(this.state.answer)
        this.setState({
            selectedAnswer: e.target.innerHTML
        })
       
    }

    handleNextButtonClick = () => {
        if(this.state.selectedAnswer.toLowerCase()){
            if (this.state.selectedAnswer.toLowerCase() === this.state.answer.toLowerCase()) {
   
               this.correctAnswer();
           } else {
          
               this.wrongAnswer();
           }

        }
        else{
            if (this.state.nextQuestion !== undefined) {
                this.setState(prevState => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                });
            }
        }
        clearInterval(this.interval);
        this.startTimer();
    };

   

    handleQuitButtonClick = () => {
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    };

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                ;
                break;

            case 'quit-button':
                this.handleQuitButtonClick();
                break;

            default:
                break;
        }

    };



    correctAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
       
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });


    }

    startTimer = () => {
        const countDownTime = Date.now() + 61000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            console.log(countDownTime)
            
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                });
            }
        }, 1000);
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    endGame = () => {
        alert('Quiz has eneded!');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,

        };
        setTimeout(() => {
            // this.props.navigate('/QuizResult', playerStats);
            // <Navigate to='/QuizResult' replace={true}/>
            Navigate({ to:'/QuizResult', replace:true, state:playerStats })
        }, 1000);
    }

    render() {
        const {
            currentQuestion,
            currentQuestionIndex,
            numberOfQuestions,
            time,
            selectedAnswer,
        } = this.state;
        console.log(this.props);
        return (
            <Fragment>
                

                <div className="questions">
                    <h2>Quiz Mode</h2>

                    <div className="timer-container">
                        <p style={{
                            display:"flex",
                            justifyContent:"space-between",
                            flexDirection:"row",
                            alignItems:"center"
                        }}>
                            <span className="left" style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className={classnames('right valid', {
                                'warning': time.distance <= 60000,
                                'invalid': time.distance < 10000
                            })}>
                                {time.minutes}:{time.seconds}
                                {/* <span className="mdi mdi-clock-outline mdi-24px"></span> */}
                                </span>
                        </p>
                    </div>
                    <h5>{currentQuestion?.question}</h5>
                    <div className="options-container">
                        <p style={{ backgroundColor: (selectedAnswer === currentQuestion?.optionA) ? "#33AA5A" : "#8031A7" }} onClick={this.handleOptionClick} className="option">{currentQuestion?.optionA}</p>
                        <p style={{ backgroundColor: (selectedAnswer === currentQuestion?.optionB) ? "#33AA5A" : "#8031A7" }} onClick={this.handleOptionClick} className="option">{currentQuestion?.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p style={{ backgroundColor: (selectedAnswer === currentQuestion?.optionC) ? "#33AA5A" : "#8031A7" }} onClick={this.handleOptionClick} className="option">{currentQuestion?.optionC}</p>
                        <p style={{ backgroundColor: (selectedAnswer === currentQuestion?.optionD) ? "#33AA5A" : "#8031A7" }} onClick={this.handleOptionClick} className="option">{currentQuestion?.optionD}</p>
                    </div>

                    <div className="button-container">

                        <button
                           
                            id="next-button"
                            onClick={this.handleNextButtonClick}>
                            Next
                        </button>
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default QuizScreen;