import React from "react";

// to be removed
export default function PreviewQuizModal({ title, difficulty, questions, onClose }) {
    return (
        <div className="preview-modal">
            <div className="preview-content">
                <h2>{title}</h2>
                <p>
                    <strong>Difficulty:</strong> {difficulty}
                </p>
                {questions.map((q, index) => (
                    <div key={index} className="preview-question">
                        <p>
                            <strong>Q{index + 1}:</strong> {q.questionText}
                        </p>
                        <ul>
                            {q.options.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>Correct Answer:</strong> {q.correctAnswer}
                        </p>
                    </div>
                ))}
                <button className="close-preview-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
