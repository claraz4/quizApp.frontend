import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import apiPrivate from "../../apis/apiPrivate";
import { questions } from "../../data/questions";
import { useLocation } from "react-router-dom";

export default function AddQuestionsPage({ quizTitle, quizId }) {
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [question, setQuestion] = useState({
        questionText: "",
        options: [{ answer: "", isCorrect: false }],
        correctAnswer: "",
        points: "",
        type: "Multiple Choice",
    });
    const { state } = useLocation();
    const { quizID } = state;

    const handleQuestionTypeChange = (newType) => {
        setQuestionType(newType);
        if (newType === "Multiple Choice") {
            setQuestion({
                questionText: "",
                options: [{ answer: "", isCorrect: false }],
                correctAnswer: "",
                points: "",
                type: newType,
            });
        } else if (newType === "True/False") {
            setQuestion({
                questionText: "",
                options: [],
                correctAnswer: "",
                points: "",
                type: newType,
            });
        }
    };

    const handleAddQuestion = async () => {
        if (!question.questionText || !question.points) {
            alert("Please fill out all required fields!");
            return;
        }

        let payload;
        let endpoint;


        try {
            // Prepare the payload and API endpoint based on question type
            if (questionType === "Multiple Choice") {
                if (question.options.length < 2) {
                    alert("Please provide at least two options!");
                    return;
                }

                payload = {
                    quiz_id: quizID,
                    question: question.questionText,
                    points: parseInt(question.points, 10),
                    possible_answers: question.options.map((option) => ({
                        answer: option.answer,
                        isCorrect: option.isCorrect,
                    })),
                };
                console.log("MCQ Payload:", payload);

                endpoint = "/quiz/createMCQ";
            } else if (questionType === "True/False") {
                if (!["True", "False"].includes(question.correctAnswer)) {
                    alert("Please select True or False as the correct answer!");
                    return;
                }

                payload = {
                    quiz_id: quizId,
                    question: question.questionText,
                    answer: question.correctAnswer === "True",
                    points: parseInt(question.points, 10),
                    quiz_id: quizID
                };
                console.log("T/F Payload:", payload);

                endpoint = "/quiz/createToF";
            }

            
            const response = await apiPrivate.post(endpoint, payload);
           
            if (response.status === 201 || response.status === 200) {
                alert("Question added successfully!");
                
                setQuestion({
                    questionText: "",
                    options: [],
                    correctAnswer: "",
                    points: "",
                    type: questionType,
                });
            } else {
                alert("Something went wrong! Please try again.");
            }
        } catch (error) {
            console.error("API Error:", error.response || error);
            alert(`Failed to add question: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="page--container">
            <div className="add-questions-container">
                <div className="dropdown-container">
                    <label htmlFor="questionType">Which type of questions do you want in your quiz?</label>
                    <select
                        id="questionType"
                        className="dropdown-select"
                        value={questionType}
                        onChange={(e) => handleQuestionTypeChange(e.target.value)}
                    >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True / False</option>
                    </select>
                </div>
                <div className="questions-list">
                    <QuestionForm
                        question={question}
                        setQuestion={setQuestion}
                    />
                </div>
                <button className="add-question-button" onClick={handleAddQuestion}>
                    Add Question
                </button>
            </div>
        </div>

    );
}
