import React, { Fragment, useState } from 'react'
import classnames from 'classnames';


function Quiz() {
    const [state, setState] = useState({
        // questions,
            // currentQuestion: {},
            // nextQuestion: {},
            // previousQuestion: {},
            // answer: '',
            numberOfQuestions: 0,
            // numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            // score: 0,
            // correctAnswers: 0,
            // wrongAnswers: 0,
            // selectedAnswer: '',
            // previousRandomNumbers: [],
            // time: {}
    })
    return (
        <Fragment>
            <h1>Quiz Page</h1>

            <div className="questions">
                <h2>Quiz Mode</h2>

                <div className="timer-container">
                    <p>
                        <span className="left" style={{ float: 'left' }}>{state?.currentQuestionIndex + 1} of {state?.numberOfQuestions}</span>
                        {/* <span className={classnames('right valid', {
                            'warning': time.distance <= 120000,
                            'invalid': time.distance < 30000
                        })}>
                            {time.minutes}:{time.seconds}
                            <span className="mdi mdi-clock-outline mdi-24px"></span></span> */}
                    </p>
                </div> 

            </div>
        </Fragment>
    )
}

export default Quiz