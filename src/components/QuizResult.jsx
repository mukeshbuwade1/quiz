import React, { Fragment } from 'react';

export default function QuizResult(props) {
    const { result: state } = props;
    const userScore = state.score * 10;
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
                    <h2>Your Score: {(state.score * 10).toFixed(0)}&#37;</h2>
                    <div className="result-box">
                        <div className="card">
                            <span className="right">{state.numberOfQuestions}</span>
                            <span className="stat left">Total</span>
                        </div>
                        <div className="card">
                            <span className="right">{state.numberOfAnsweredQuestions}</span>
                            <span className="stat left">attempted</span>
                        </div>
                        <div className="card">
                            <span className="right">{state.correctAnswers}</span>
                            <span className="stat left">Correct</span>
                        </div>
                        <div className="card">
                            <span className="right">{state.wrongAnswers}</span>
                            <span className="stat left">Wrong</span>
                        </div>
                    </div>

                </div>
                <div style={{ textAlign: 'center',marginTop:"10px" }}>
                    <button className='button' onClick={() => props?.setScreenName("QuizDetail")} >Back to Home</button>
                </div>

            </Fragment>
        );
    } else {
        stats = (
            <section style={{ textAlign: 'center',marginTop:"10px" }}>
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


