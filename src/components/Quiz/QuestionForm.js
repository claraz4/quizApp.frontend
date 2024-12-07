import React from "react";


export default function QuestionForm({ question, onUpdate,deleteQ,id }) {
    const updateField = (field, value) => {
        onUpdate({ ...question, [field]: value });
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[index] = value;
        updateField("options", updatedOptions);
    };

    return (
        <div className="question-form">
            <input
                className="question-input"
                type="text"
                placeholder="Enter question text"
                value={question.questionText}
                onChange={(e) => updateField("questionText", e.target.value)}
            />
            {question.type === "Multiple Choice" && (
                <div className="options-container">
                    {question.options.map((option, index) => (
                        <input
                            key={index}
                            className="option-input"
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                        />
                    ))}
                </div>
            )}
            {question.type === "True/False" && (
                <div className="true-false-container">
                    <label>
                        <input
                            type="radio"
                            name={`true-false-${question.id}`}
                            value="True"
                            onChange={() => updateField("correctAnswer", "True")}
                        />
                        True
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`true-false-${question.id}`}
                            value="False"
                            onChange={() => updateField("correctAnswer", "False")}
                        />
                        False
                    </label>
                </div>
            )}
            <input
                className="correct-answer-input"
                type="text"
                placeholder="Enter correct answer"
                value={question.correctAnswer || ""}
                onChange={(e) => updateField("correctAnswer", e.target.value)}
            />
            <button className="delete-question-button" id={id} onClick={(e)=>deleteQ(e)}>Delete</button>
        </div>
    );
}
