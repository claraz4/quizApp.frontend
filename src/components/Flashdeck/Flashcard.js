import React, { useEffect, useState } from 'react';
import BackArrow from '../BackArrow';
import ReactFlipCard from 'reactjs-flip-card';
import { useLocation } from 'react-router-dom';

export default function Flashcard(props) {
    const { state } = useLocation();
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [from, setFrom] = useState("");
    const [prevState, setPrevState] = useState("");

    useEffect(() => {
        if (!props.isViewDeck) {
            setTitle(state.title);
            setDifficulty(state.difficulty);
            setQuestion(state.question);
            setAnswer(state.answer);
            setFrom(state.from);
            setPrevState(state.state);
        } else {
            setTitle(props.title);
            setDifficulty(props.difficulty);
            setQuestion(props.question);
            setAnswer(props.answer);
            setFrom(props.from);
            setPrevState(props.prevState);
        }
    }, [props.isViewDeck, props.title, props.difficulty, props.question, props.answer, props.from, state, props.prevState]);
    
    const difficultyElement = (
        <div>
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>
            {(difficulty === "Medium" || difficulty === "Hard") &&
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>}
            {difficulty === "Hard" &&
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>}
        </div>
    );
    console.log(from)
    console.log(prevState)

    return (
        <div className="flashcard--page">
            <BackArrow 
                to={from}
                state={{ ...prevState }}
            />
            {state && 
            <ReactFlipCard 
                frontComponent={
                    <div>
                        <div className="flashcard-header--container">
                            <p>{title}</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--question-container">
                            <h1>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                                <span>{question}</span>
                            </h1>
                        </div>
                    </div>
                }
                backComponent={
                    <div className="flashcard-back--container">
                        <div className="flashcard-header--container">
                            <p>{title}</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--answer-container">
                            <h1>{answer}</h1>
                        </div>
                    </div>
                }
                containerCss="flashcard--container"
                flipTrigger="onClick"
            />}
        </div>
    )
}