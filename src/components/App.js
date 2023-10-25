import React, {useState} from 'react';
import quiz from '../quiz';
import Answer from "./Answer";

function App() {

    const [finished, setFinished] = useState(false);
    const [points, setPoints] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState(quiz);
    const question = questions[currentQuestion];

    const reachedEndOFQuiz = currentQuestion + 1 === questions.length;
    const startOfQuiz = currentQuestion === 0;

    function nextQuestion() {
        if (reachedEndOFQuiz) return;
        setCurrentQuestion(currentQuestion + 1);
    }

    function previousQuestion() {
        if (startOfQuiz) return;
        setCurrentQuestion(currentQuestion - 1);
    }

    function submitChoice(answerData) {
        setQuestions(questions.map(quest => {
            if (quest.id === question.id) {
                return {...quest, selectAnswer: answerData}
            } else {
                return quest;
            }
        }))

        console.log(question.selectAnswer);
    }

    function isSelectedAnswer(data) {
        return question.selectAnswer.answer === data.answer;
    }

    function calculateResults() {
        const correct = questions.filter(question => question.selectAnswer.correct);
        setPoints(correct.length);
        setFinished(true);
    }

    function restart() {
        setCurrentQuestion(0);
        setFinished(false);
        setQuestions(quiz);
    }

    return (
        <div className="App">
            {
                finished
                    ? <>
                        <h1>Congratulations on completing the Quiz!</h1>
                        <p>You scored {points} out of {questions.length}</p>
                        <button onClick={restart}>Restart</button>
                    </>
                    : <>
                        <h1>Quiz Master - Question {currentQuestion + 1} of {questions.length}</h1>
                        <div>
                            <h1>{question.prompt}</h1>
                            <div className={"answer_box"}>
                                {question.answers.map(data => {
                                    return <h1 className={isSelectedAnswer(data) ? "selected_answer" : "answer"}
                                               onClick={() => submitChoice(data)}>{data.answer}</h1>
                                })}
                            </div>
                            {!startOfQuiz ?
                                <button className={"action_button"} onClick={previousQuestion}>Previous</button> : null}
                            <button className={"action_button"}
                                    onClick={reachedEndOFQuiz ? calculateResults : nextQuestion}>{reachedEndOFQuiz ? "Finish" : "Next"}</button>
                        </div>
                    </>
            }
        </div>
    );
}

export default App;
