import React, { useState, useRef, useEffect } from 'react';
import { questions } from '../../data/questions';
import BackArrow from '../BackArrow';

export default function DisplayQuiz () {
    let[index, setIndex] = useState(0);
    let[question,setQuestion] = useState(questions[index]);
    let [lock,setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [timeLeft, setTimeLeft] = useState(0 * 3600 + 0 * 60 + 3);
    let [showPopup, setShowPopup] = useState(false); 
    let [isTimerActive, setIsTimerActive] = useState(true); 

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
             const timer = setInterval(() => {
               setTimeLeft((prev) => prev - 1);
             }, 1000);
             return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setShowPopup(true); 
        }
    }, [timeLeft, isTimerActive]);

    const checkAns = (e, ans) => {
        if(lock === false){
            if (question.ans === ans) {
                e.target.classList.add("correct"); 
                setLock(true); 
                setScore(prev => prev + 1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if(lock === true){
            if(index === questions.length - 1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(questions[index]);
            setLock(false);
            option_array.map((option) =>{
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })
        }
    }

    
    const handleContinueWithoutTimer = () => {
        setIsTimerActive(false); 
        setShowPopup(false); 
    };

    const restart = () => {
        setIndex(0);
        setQuestion(questions[0]);
        setTimeLeft(0 * 3600 + 1 * 60 + 3); 
        setLock(false);
        setScore(0); 
        setResult(false); 
        setShowPopup(false);
        setIsTimerActive(true);
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return (
            <div className ="display-quiz-page">
                <BackArrow 
                to="/my-notebooks/quiz"
                />
                <div className="display-quiz-container">
                    {result? <></>: 
                    <>
                        <h1 className="display-quiz-title">quiz title</h1>
                        {isTimerActive && (
                            <div className="quiz-timer">
                                Time Left: {formatTime(timeLeft)}
                            </div>
                        )}
                        <hr/>
                        <h2>{index + 1}. {question.question}</h2>
                        <ul className="display-quiz-options">
                            <li ref={Option1} onClick={(e) => {checkAns(e,1)}}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => {checkAns(e,2)}}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>
                        </ul>
                        <button onClick={next}>Next</button>
                        <div className="questions-index">{index+1} of {questions.length} questions</div>
                    </>}
                    {result?<>
                        <h2>Quiz Completed!</h2>
                        <h2>You Scored {score} out of {questions.length}</h2>
                        <button onClick ={restart}>Retake Quiz</button>
                    </>:<></>}
                </div>

                {showPopup && (
                <div className="time-up-popup">
                    <div className="popup-content">
                        <h2>Time's Up!</h2>
                        <p>Your time for this quiz has ended. Would you like to continue?</p>
                        <div className="popup-actions">
                            <button onClick={handleContinueWithoutTimer}>
                                Continue
                            </button>
                            <button onClick={restart}>Restart</button>
                        </div>
                    </div>
                </div>
            )}

            </div>
    );
}