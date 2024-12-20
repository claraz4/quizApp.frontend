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

    const addOption = () => {
        const updatedOptions = [...question.options, ""];
        updateField("options", updatedOptions);
    };

    const removeOption = (index) => {
        const updatedOptions = question.options.filter((_, i) => i !== index);
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
                        <div key={index} className="option-item">
                            <input
                                className="option-input"
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                            />
                            {question.options.length > 2 && (
                                <button
                                    className="remove-option-button"
                                    onClick={() => removeOption(index)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button className="add-option-button" onClick={addOption}>
                        Add Option
                    </button>
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
            <input
                className="points-input"
                type="number"
                min="1"
                placeholder="Enter points for this question"
                value={question.points || ""}
                onChange={(e) => updateField("points", parseInt(e.target.value, 10))}
            />
            <button className="delete-question-button" id={id} onClick={(e)=>deleteQ(e)}>Delete</button>
        </div>
    );
}
