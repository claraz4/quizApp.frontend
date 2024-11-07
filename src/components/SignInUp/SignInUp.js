import React, { useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function SignInUp() {
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('sign-in-up--container');
    
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active--sign-in-up");
        });
    
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active--sign-in-up");
        });
    }, [])

    return (
        <div className="sign-in-up--page">
            <div className="sign-in-up--container" id="sign-in-up--container">
                <SignIn />
                <SignUp />
                <div className="overlay-container--sign-in-up">
                    <div className="overlay--sign-in-up">
                        <div className="overlay-panel--sign-in-up overlay-left--sign-in-up">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="button--sign-in-up button--sign-in-up-ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel--sign-in-up overlay-right--sign-in-up">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="button--sign-in-up button--sign-in-up-ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}