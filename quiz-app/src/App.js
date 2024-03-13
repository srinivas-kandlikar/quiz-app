import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [ans, setAns] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:9000/questions`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    }
    fetchData();
  }, []);

  function nextButton() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsDisabled(currentQuestionIndex >= questions.length - 1);
    setAns("");
  }

  function prevButton() {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setIsDisabled(false);
  }

  function answerFun(e) {
    setAns(e.target.value);
  }

  return (
    <div className='container-fluid'>
      <div className="App">
        <header className="App-header">
          <img width="200px" src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
          <h3>Answer: {ans}</h3>
          {questions.map((el, index) => (
            index === currentQuestionIndex && (
              <div key={index}>
                <h1>Questions: {index + 1}. {el.questions}</h1>
                {el.options.map((option, idx) => (
                  <button key={idx} value={option} onClick={answerFun}>{option}</button>
                ))}
                <h1>Answer: {ans !== el.options[el.correctOption] || ans === undefined ? <>Please try</> : "You are correct"}</h1>
              </div>
            )
          ))}
          <button onClick={prevButton} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={nextButton} disabled={isDisabled}>Next</button>
        </header>
      </div>
    </div>
  );
}

export default App;
