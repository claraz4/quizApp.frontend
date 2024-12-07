import React from "react";

export default function QuizCard({ title, difficulty, questions }) {
    return (
        <div className="quiz-card">
            <h2 className="quiz-card-title">{title}</h2>
            <p className="quiz-card-difficulty">
                <strong>Difficulty:</strong> {difficulty}
            </p>
            <p className="quiz-card-questions">
                <strong>Number of Questions:</strong> {questions.length}
            </p>
        </div>
    );
}