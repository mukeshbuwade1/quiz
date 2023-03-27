import React, { Fragment } from 'react';

export default function QuizResult(props) {
    const { result: state } = props;
    const userScore = state.score;
    let stats, remark;
    if (userScore <= 30) {
        remark = 'You need more practice!';
    } else if (userScore > 30 && userScore <= 50) {
        remark = 'Better luck next time!';
    } else if (userScore <= 70 && userScore > 50) {
        remark = 'You can do better!';
    } else if (userScore >= 71 && userScore <= 84) {
        remark = 'You did great!';
    } else {
        remark = 'You\'re an absolute genius!';
    }
    if (state !== undefined) {
        stats = (
            <Fragment>
                <div style={{ textAlign: 'center' }}>
                    <span className="mdi mdi-check-circle-outline success-icon"></span>
                </div>
                <h1>Quiz has ended</h1>
                <div className="container stats">
                    <h4>{remark}</h4>
                    <h2>Your Score: {state.score.toFixed(0)}&#37;</h2>
                    <span className="stat left">Total number of questions: </span>
                    <span className="right">{state.numberOfQuestions}</span><br />

                    <span className="stat left">Number of attempted questions: </span>
                    <span className="right">{state.numberOfAnsweredQuestions}</span><br />

                    <span className="stat left">Number of Correct Answers: </span>
                    <span className="right">{state.correctAnswers}</span> <br />

                    <span className="stat left">Number of Wrong Answers: </span>
                    <span className="right">{state.wrongAnswers}</span><br />

                </div>

                <button className='button' onClick={() => props?.setScreenName("QuizDetail")} >Back to Home</button>

            </Fragment>
        );
    } else {
        stats = (
            <section>
                <h1 className="no-stats">No Statistics Available</h1>
                <button className='button' onClick={() => props?.setScreenName("QuizDetail")} >Back to Home</button>
            </section>
        );
    }
    return (

        <div className="quiz-summary">
            {stats}
        </div>

    )
}


