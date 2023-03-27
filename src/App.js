import './App.css';
import QuizDetail from './components/QuizDetail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import AttemptScreen from './components/QuizScreen';
import QuizScreen from './components/QuizScreen';
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
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<QuizDetail />} />
    //     <Route path="/QuizScreen" element={<Quiz />} />
    //     <Route path="/QuizResult" element={<QuizResult />} />

    //   </Routes>
    // </Router>
  );
}

export default App;
