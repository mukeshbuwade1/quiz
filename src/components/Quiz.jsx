import React, { Component, Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';
// import 'QuizScreenStyle.scss'
import { que as questions } from '../assets/dummyData';
import isEmpty from '../utils/isEmpty';
import Timer from './Timer';
// import { Navigate, useNavigate } from 'react-router-dom';


function Quiz(props) {
    // const navigate= useNavigate()
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

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };
    useEffect(() => {
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
        if (timesUp) handleNextButtonClick()
    }, [timesUp])


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
            // clearInterval(interval);
            // startTimer();

            // this.showOptions();
            // this.handleDisableButton();

        }
    };

    const handleOptionClick = (e) => {
        if (e.target.innerHTML !== state.selectedAnswer) {
            setState({
                ...state,
                selectedAnswer: e.target.innerHTML
            })
        }
    }
    let interval;
    function startTimer() {
        const countDownTime = Date.now() + 61000;
        interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            console.log(countDownTime)

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setState({
                    ...state,
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                });
                // endGame();
            } else {
                setState({
                    ...state,
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                });
            }
        }, 1000);
    }

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
            console.log("first")
            if (state.nextQuestion !== undefined) {
                setState({
                    ...state,
                    currentQuestionIndex: state.currentQuestionIndex + 1
                });
                // displayQuestions(questions, state.currentQuestion, state.nextQuestion, state.previousQuestion);
            }
            else {
                endGame();
            }
        }
        // clearInterval(interval);
        // startTimer();
    };

    function correctAnswer() {
        console.log("mk", state?.currentQuestionIndex)
        setState({
            ...state,
            score: state.score + 1,
            correctAnswers: state.correctAnswers + 1,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1
        });


    }
    function setupNextQue() {
        setTimesUp(false)
        console.log("mk1", state?.currentQuestionIndex)
        if (state.nextQuestion === undefined) {
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
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }));

    }
    console.log("quiz")
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