import React, { useState } from "react";
import PreviewQuizModal from "./PreviewQuizModal";
import TimerSelector from "./TimerSelector";

export default function CreateQuizPage() {
    const [quizTitle, setQuizTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showPreview, setShowPreview] = useState(false);

    const handleTimerChange = (newTimer) => {
        setTimer(newTimer);
    };

    const handleSaveQuiz = () => {
        if (!quizTitle || !difficulty) {
            alert("Please fill out all fields!");
            return;
        }

        const quizData = {
            title: quizTitle,
            difficulty: difficulty,
            timer: timer,
        };

        // API call to save the quiz
        console.log("Quiz Saved:", quizData);
        alert("Quiz Saved!");
    };

    return (
        <div className="page--container">
            <h1 className="create-new-quiz">Create a New Quiz</h1>
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
            {/* <button
                className="preview-quiz-button"
                onClick={() => setShowPreview(true)}
            >
                Preview Quiz
            </button> */}
            <button className="save-quiz-button" onClick={handleSaveQuiz}>
                Save Quiz
            </button>
            {/* {showPreview && (
                <PreviewQuizModal
                    title={quizTitle}
                    difficulty={difficulty}
                    questions={questions}
                    onClose={() => setShowPreview(false)}
                />
            )} */}
        </div>
    );
}
