import React, { Fragment, useEffect, useState } from 'react';
import { que as questions } from '../assets/dummyData';
import isEmpty from '../utils/isEmpty';
import Timer from './Timer';

function Quiz(props) {
    // react state 
    const [state, setState] = useState({
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
    })
    const [timesUp, setTimesUp] = useState(false)

    // useEffect hook - call when page is refreshing 
    useEffect(() => {
        const alertUser = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    useEffect(() => {
        const { currentQuestion, nextQuestion, previousQuestion } = state;
        displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    }, [questions])

    useEffect(() => {
        setupNextQue()
    }, [state.currentQuestionIndex])

    useEffect(() => {
        if (timesUp) { handleNextButtonClick() }
    }, [timesUp])

    // helper functions 
    // setting up question 
    const displayQuestions = (questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = state;
        if (!isEmpty(questions)) {
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion?.answer;
            setState({
                ...state,
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            });
        }
    };

    // store selectedAnswer 
    const handleOptionClick = (e) => {
        if (e.target.innerHTML !== state.selectedAnswer) {
            setState({
                ...state,
                selectedAnswer: e.target.innerHTML
            })
        }
    }

    // next button click event 
    function handleNextButtonClick() {
        if (state?.selectedAnswer) {
            if (state.selectedAnswer.toLowerCase() === state.answer.toLowerCase()) {
                correctAnswer();
            }
            else {
                wrongAnswer();
            }
        }
        else {
            if (state.nextQuestion !== undefined || !timesUp) {
                setState({
                    ...state,
                    currentQuestionIndex: state.currentQuestionIndex + 1
                });
            }
            else {
                endGame();
            }
        }
    };

    function correctAnswer() {
        setState({
            ...state,
            score: state.score + 1,
            correctAnswers: state.correctAnswers + 1,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1,
            selectedAnswer: ""
        });
    }
    function setupNextQue() {
        if (state.nextQuestion === undefined || timesUp) {
            endGame();
        } else {
            displayQuestions(questions, state.currentQuestion, state.nextQuestion, state.previousQuestion);
        }
    }


    function endGame() {
        alert('Quiz has eneded!');
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
        };
        props.setResult(playerStats)
        setTimeout(() => {
            props.setScreenName("QuizResult")
        }, 10);
    }

    function wrongAnswer() {
        setState(prevState => ({
            ...prevState,
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
            selectedAnswer: ''
        }));
    }
    
    return (
        <Fragment>
            <div className="questions">
                <h2>Quiz Mode</h2>

                <div className="timer-container">
                    <p >
                        <span className="left" style={{ float: 'left', }}>{state?.currentQuestionIndex + 1} of {state?.numberOfQuestions}</span>
                        <Timer questionIndex={state?.currentQuestionIndex} setTimesUp={setTimesUp} />
                    </p>
                </div>
                <h5>{state?.currentQuestion?.question}</h5>
                <div className='options-body'>
                    <div className="options-container">
                        <p style={{ backgroundColor: (state?.selectedAnswer === state?.currentQuestion?.optionA) ? "#33AA5A" : "#fff" }}
                            onClick={handleOptionClick} className="option"  >{state?.currentQuestion?.optionA}</p>
                        <p style={{ backgroundColor: (state?.selectedAnswer === state?.currentQuestion?.optionB) ? "#33AA5A" : "#fff" }}
                            onClick={handleOptionClick} className="option"  >{state?.currentQuestion?.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p style={{ backgroundColor: (state?.selectedAnswer === state?.currentQuestion?.optionC) ? "#33AA5A" : "#fff" }}
                            onClick={handleOptionClick} className="option"  >{state?.currentQuestion?.optionC}</p>
                        <p style={{ backgroundColor: (state?.selectedAnswer === state?.currentQuestion?.optionD) ? "#33AA5A" : "#fff" }}
                            onClick={handleOptionClick} className="option"  >{state?.currentQuestion?.optionD}</p>
                    </div>
                </div>
                <div className="button-container">

                    <button
                        id="next-button"
                        onClick={handleNextButtonClick}>
                        {state.nextQuestion !== undefined ? "Next" : "Submit"}
                    </button>

                </div>
            </div>
        </Fragment>
    )
}

export default Quiz