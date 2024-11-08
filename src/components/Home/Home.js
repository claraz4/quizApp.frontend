import React from 'react';

export default function Home() {
    return (
            <div className="container mx-auto px-4 py-5">
                <header className="flex justify-between  py-4 px-4">
                    <h1 className="text-2xl font-bold">Quiz<span className="text-purple-500">App</span></h1>
                    <div className ="flex space-x-4">
                        <button className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600">Sign in</button>
                        <button className="px-6 py-2 border-2 border-purple-500 text-purple-500 font-semibold rounded-full hover:bg-purple-600 hover:text-white">Sign up</button>    
                    </div>
                </header>       
                <main className="flex flex-col items-center justify-center text-center mt-32">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your All-in-One Study Companion</h1>
                        <p className="text-lg mb-6">Welcome to Quiz<span className="text-purple-500">App</span>! Dive into a world of organized notes, interactive quizzes, and custom flashcards. Join a community where knowledge is built together, with tools designed to make studying easier and more enjoyable.</p>
                        <button className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600">Get Started</button>
                    </div>
                </main>
            </div>

    )
}