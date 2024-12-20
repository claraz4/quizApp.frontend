import React, { useState } from "react";
import QuestionForm from "./QuestionForm";

export default function AddQuestionsPage({ quizTitle }) {
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { 
                questionText: "", 
                options: questionType === "Multiple Choice" ? ["", ""] : [], 
                correctAnswer: "", 
                type: questionType, 
            },
        ]);
    };

    const updateQuestion = (index, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const deleteQ=(e)=>{
        const indexToDelete = parseInt(e.target.id, 10);
        const filteredQuestions = questions.filter((_, index) => index !== indexToDelete);
        setQuestions(filteredQuestions);

        console.log("Deleted Question Index:", indexToDelete);
        console.log("Updated Questions:", filteredQuestions);
        
    }
    
    const handleSaveQuestions = () => {
        // API call to save questions for the quiz
        console.log("Questions Saved for Quiz:", quizTitle, questions);
        alert("Questions Saved!");
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
            </div>
        </div>
    );
}
