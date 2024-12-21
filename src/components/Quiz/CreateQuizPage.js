import React, { useState } from "react";
import PreviewQuizModal from "./PreviewQuizModal";
import TimerSelector from "./TimerSelector";
import apiPrivate from "../../apis/apiPrivate";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateQuizPage() {
    const [quizTitle, setQuizTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const { state } = useLocation(); // state.notebookID
    const notebookId = state?.notebookID || null;
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    const handleTimerChange = (newTimer) => {
        setTimer(newTimer);
    };

    const handleSaveQuiz = async () => {
        if (!quizTitle || !difficulty) {
            alert("Please fill out all fields!");
            return;
        }

        const totalSeconds = timer.hours * 3600 + timer.minutes * 60 + timer.seconds;

        const quizData = {
            title: quizTitle,
            notebook_id: notebookId,
            difficulty: difficulty.toLowerCase(),
            time: totalSeconds,
        };

        try { 
            const response = await apiPrivate.post("/createQuiz", quizData);
            alert("Quiz saved successfully!");
            console.log("API Response:", response.data);
            setQuizTitle("");
            setDifficulty("");
            setTimer({ hours: 0, minutes: 0, seconds: 0 });
            navigate("/my-notebooks/quiz/add-question", {
                state: { quizID: response.data.id }
            })
        } catch (error) {
            console.error("Error saving the quiz:", error);
            alert("Failed to save quiz. Please try again.");
        }
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
