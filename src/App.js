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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizDetail />} />
        <Route path="/QuizScreen" element={<QuizScreen />} />
        <Route path="/QuizResult" element={<QuizResult />} />

      </Routes>
    </Router>
  );
}

export default App;
