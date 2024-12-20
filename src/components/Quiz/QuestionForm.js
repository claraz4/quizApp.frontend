import React from "react";

export default function QuestionForm({ question, onUpdate, setQuestion, deleteQ, id }) {
    const updateField = (field, value) => {
        setQuestion(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[index].answer = value;
        setQuestion(prev => ({
            ...prev,
            options: updatedOptions
        }));
    };

    const toggleCorrectAnswer = (index) => {
        const updatedOptions = question.options.map((option, i) => ({
            ...option,
            isCorrect: i === index, // Only the selected checkbox is marked as correct
        }));
        setQuestion(prev => {
            return {
                ...prev, 
                options: updatedOptions
            }
        })
    };

    const addOption = () => {
        const prevOptions = [...question.options];
        prevOptions.push({ answer: "", isCorrect: false });

        setQuestion(prev => {
            return {
                ...prev,
                options: prevOptions
            }
        })
        // const updatedOptions = [...question.options, { answer: "", isCorrect: false }];
        // updateField("options", updatedOptions);
    };

    const removeOption = (index) => {
        // const updatedOptions = question.options.filter((_, i) => i !== index);
        // updateField("options", updatedOptions);
        const prevOptions = [...question.options];
        const newOptions = prevOptions.filter((_, i) => i !== index);
        setQuestion(prev => {
            return {
                ...prev,
                options: newOptions
            }
        })
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
                                value={option.answer}
                                onChange={(e) => updateOption(index, e.target.value)}
                            />
                            <input
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={() => toggleCorrectAnswer(index)}
                                className="correct-answer-checkbox"
                            />
                            <button
                                className="remove-option-button"
                                onClick={() => removeOption(index)}
                            >
                                X
                            </button>
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
                            name={`true-false-${id}`}
                            value="True"
                            checked={question.correctAnswer === "True"}
                            onChange={() => updateField("correctAnswer", "True")}
                        />
                        True
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`true-false-${id}`}
                            value="False"
                            checked={question.correctAnswer === "False"}
                            onChange={() => updateField("correctAnswer", "False")}
                        />
                        False
                    </label>
                </div>
            )}
            <input
                className="points-input"
                type="number"
                min="1"
                placeholder="Enter points for this question"
                value={question.points || ""}
                onChange={(e) => updateField("points", parseInt(e.target.value, 10))}
            />
            {/* <button className="delete-question-button" id={id} onClick={(e) => deleteQ(e)}>
                Delete
            </button> */}
        </div>
    );
}
