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
            <div className='relative bg-[#00000099] '>
                <img src={'/images/students.jpg'}
                    className='w-[100vw] h-full z-[-1] absolute'
                    alt="Students"
                /> 
                <header className="flex justify-between  py-4 px-4 bg-[#0000007d] ">
                    <h1 className="text-3xl font-bold text-white">Quiz<span className="text-purple-500">App</span></h1>
                    <div className ="flex gap-4 pr-5">
                        <button className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 duration-300 transition-all" >Sign in</button>
                        <button className="px-6 py-2 border-2 border-purple-500 text-purple-500 font-semibold rounded-full hover:bg-purple-600 hover:text-white duration-300 transition-all">Sign up</button>    
                    </div>
                </header>       
                <main className="flex flex-col items-center justify-center text-center h-[85vh] ">
                    <div className="md:w-1/2 z-[999]">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Your All-in-One Study Companion</h1>
                        <p className="text-lg mb-6 text-white">Welcome to Quiz<span className="text-purple-500">App</span>! Dive into a world of organized notes, interactive quizzes, and custom flashcards. Join a community where knowledge is built together, with tools designed to make studying easier and more enjoyable.</p>
                        <button className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600 duration-300 transition-all" onClick={handleGetStartedClick}>Get Started</button>
                    </div>
                </main>
                    
            </div>

    )
}