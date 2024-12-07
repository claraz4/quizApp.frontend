/* this to be deleted later */
import React from "react";
import QuizCard from "./QuizCard";
import quizzes from "../../data/quizzes";

export default function QuizList() {
    const quizCard = quizzes.map((quiz, index) => {
        return (<QuizCard
            key={index}
            title={quiz.title}
            difficulty={quiz.difficulty}
            questions={quiz.questions}
        />)
        }
    )
    return (
        <div className="quiz-list">
            {quizCard}
        </div>
    );
}
