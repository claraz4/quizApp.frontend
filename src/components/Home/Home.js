import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
            <div className="home-container">
                <img src={'/images/students.jpg'}
                    className="home-background-image"
                    alt="Students"
                /> 
                <header className="home-header">
                    <h1 className="home-header-title">Quiz<span className="highlight">App</span></h1>
                    <div className ="home-button-group">
                        <Link to="/sign-in" state={{ isSignIn: true }} className="home-sign-in-button" >Sign in</Link>
                        <Link to="/sign-in" state={{ isSignIn: false }} className="home-sign-up-button">Sign up</Link> 
                    </div>
                </header>       
                <main className="home-main-content">
                    <div className="home-main-text">
                        <h1 className="home-main-title">Your All-in-One Study Companion</h1>
                        <p className="home-main-description">Welcome to Quiz<span className="highlight">App</span>! Dive into a world of organized notes, interactive quizzes, and custom flashcards. Join a community where knowledge is built together, with tools designed to make studying easier and more enjoyable.</p>
                        <Link to="/sign-in" className="home-get-started-button">Get Started</Link>
                    </div>
                </main>
                    
            </div>

    )
}