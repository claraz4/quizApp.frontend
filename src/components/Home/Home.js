import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        setTimeout(() => {
            navigate('/sign-in');
        }, 500); 
    };

    return (
            <div className="home-container">
                <img src={'/images/students.jpg'}
                    className="home-background-image"
                    alt="Students"
                /> 
                <header className="home-header">
                    <h1 className="home-header-title">Quiz<span className="highlight">App</span></h1>
                    <div className ="home-button-group">
                        <a href="/sign-in/?isSignIn=true">
                            <button className="home-sign-in-button" >Sign in</button>
                        </a>
                        <a href="/sign-in/?isSignin=false"><button className="home-sign-up-button">Sign up</button></a>    
                    </div>
                </header>       
                <main className="home-main-content">
                    <div className="home-main-text">
                        <h1 className="home-main-title">Your All-in-One Study Companion</h1>
                        <p className="home-main-description">Welcome to Quiz<span className="highlight">App</span>! Dive into a world of organized notes, interactive quizzes, and custom flashcards. Join a community where knowledge is built together, with tools designed to make studying easier and more enjoyable.</p>
                        <button className="home-get-started-button" onClick={handleGetStartedClick}>Get Started</button>
                    </div>
                </main>
                    
            </div>

    )
}