import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useLocation } from 'react-router-dom';

export default function SignInUp() {
    const search = useLocation().search;
    const [isSignIn, setIsSignIn] = useState(search === "?isSignIn=true" ? true : false);
    
    return (
        <div className={`sign-in-up--container${!isSignIn ? " right-panel-active--sign-in-up" : ""}`} id="sign-in-up--container">
            <SignIn 
                isSignIn={isSignIn}
            />
            <SignUp 
                isSignIn={isSignIn}
            />
            <div className="overlay-container--sign-in-up">
                <div className="overlay--sign-in-up">
                    <div className="overlay-panel--sign-in-up overlay-left--sign-in-up">
                        <h1 className="sign-in-up-title">Welcome Back!</h1>
                        <p className="sign-in-up-subtitle">To keep connected with us, please login with your personal info</p>
                        <button 
                            className="button--sign-in-up button--sign-in-up-ghost" 
                            onClick={() => setIsSignIn(true)}
                            >Sign In</button>
                    </div>
                    <div className="overlay-panel--sign-in-up overlay-right--sign-in-up">
                        <h1 className="sign-in-up-title">Welcome to Quiz App!</h1>
                        <p className="sign-in-up-subtitle">Enter your personal details and enjoy our features</p>
                        <button 
                            className="button--sign-in-up button--sign-in-up-ghost" 
                            onClick={() => setIsSignIn(false)}
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}