import './App.css';
import QuizDetail from './components/QuizDetail';
import QuizResult from './components/QuizResult';
import Quiz from './components/Quiz';
import React, { useState } from 'react';

function App() {
  const [screenName, setScreenName] = useState("QuizDetail")
  const [result, setResult] = useState({})
  return (
    <>
      {
        screenName === "QuizDetail"
          ? <QuizDetail setScreenName={setScreenName} />
          : screenName === "Quiz"
            ? <Quiz setScreenName={setScreenName} setResult={setResult} />
            : <QuizResult setScreenName={setScreenName} result={result} />
      }
    </>
  );
}

export default App;
