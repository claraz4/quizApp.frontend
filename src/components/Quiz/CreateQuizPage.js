import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import PreviewQuizModal from "./PreviewQuizModal";
import TimerSelector from "./TimerSelector";

export default function CreateQuizPage() {
    const [quizTitle, setQuizTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [questions, setQuestions] = useState([]);
    const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showPreview, setShowPreview] = useState(false);

    const handleTimerChange = (newTimer) => {
        setTimer(newTimer);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { 
                questionText: "", 
                options: questionType === "Multiple Choice" ? ["", "", "", ""] : [], // Default for Multiple Choice
                correctAnswer: "", 
                type: questionType, // Save type for each question
            },
        ]);
    };

    const updateQuestion = (index, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const deleteAll=()=>{
        setQuestions([]);
    }
    const deleteQ=(e)=>{
        const indexToDelete = parseInt(e.target.id, 10);

        const filteredQuestions = questions.filter((_, index) => index !== indexToDelete);

        setQuestions(filteredQuestions);

        console.log("Deleted Question Index:", indexToDelete);
        console.log("Updated Questions:", filteredQuestions);
        
    }
    
    const handleSaveQuiz = () => {
        if (!quizTitle) {
            alert("Please enter a quiz title!");
            return;
        }
        if (!difficulty) {
            alert("Please select a difficulty level!");
            return;
        }
        console.log("Quiz Saved:", { title: quizTitle, questions });
        alert("Quiz Saved!");
    };

    return (
        <div className="create-quiz-container">
            <h1>Create a New Quiz</h1>
            <input
                className="quiz-title-input"
                type="text"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
            />

            <div className="difficulty-container">
                <label htmlFor="difficulty">How difficult do you want your quiz to be?</label>
                <select
                    id="difficulty"
                    className="difficulty-select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="" disabled>
                        Select Difficulty Level
                    </option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <TimerSelector onTimerChange={handleTimerChange} />
            <p>
                Selected Time: {timer.hours} hours {timer.minutes} minutes {timer.seconds} seconds
            </p>

            <div className="dropdown-container">
                <label htmlFor="questionType">Which type of questions do you want in your quiz?</label>
                <select
                    id="questionType"
                    className="dropdown-select"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True / False</option>
                </select>
            </div>

            <div className="questions-list">
                {questions.map((question, index) => (
                    <QuestionForm
                        id={index}
                        key={index}
                        question={question}
                        onUpdate={(updatedQuestion) =>
                            updateQuestion(index, updatedQuestion)
                        }
                        deleteQ={deleteQ}
                    />
                ))}
            </div>
            <button className="add-question-button" onClick={addQuestion}>
                Add Question
            </button>
            <button
                className="preview-quiz-button"
                onClick={() => setShowPreview(true)}
            >
                Preview Quiz
            </button>
            <button className="save-quiz-button" onClick={handleSaveQuiz}>
                Save Quiz
            </button>
            {showPreview && (
                <PreviewQuizModal
                    title={quizTitle}
                    difficulty={difficulty}
                    questions={questions}
                    onClose={() => setShowPreview(false)}
                />
            )}
            <button className="add-question-button" onClick={()=>deleteAll()}>Clear Questions</button>
        </div>
    );
}
