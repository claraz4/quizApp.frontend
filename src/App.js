import "./styles/styles.css";
import "./styles/dashboard.css";
import "./styles/sign-in-up.css";
import "./styles/create-notebook.css";
import "./styles/my-notebooks.css";
import "./styles/flashdeck.css";
import "./styles/home.css";

import Home from "./components/Home/Home";
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Discover from "./components/Discover/Discover";
import SignInUp from "./components/SignInUp/SignInUp";
import CreateNotebook from "./components/CreateNotebook/CreateNotebook";
import SingleNotebook from "./components/MyNotebooks/SingleNotebook";
import Flashdeck from "./components/Flashdeck/Flashdeck";
import CreateFlashcard from "./components/Flashdeck/CreateFlashcard";
import Flashcard from "./components/Flashdeck/Flashcard";
import useAuthContext from "./hooks/useAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import useShowDashboardContext from "./hooks/useShowDashboardContext";
import CheckDashboard from "./components/CheckDashboard";

export default function App() {
  const { token } = useAuthContext();
  const { showDashboard } = useShowDashboardContext();

  return (
    <div className="app--container">
      <BrowserRouter>
      <CheckDashboard />
        {token && showDashboard && <Dashboard />}
        <Routes>
          <Route 
            path="/" 
            element={
              !token ? <Home /> : <Navigate to="/discover" replace />
            }
          />
          <Route 
            path="/sign-in" 
            element={
              !token ? <SignInUp /> : <Navigate to="/discover" replace />
            }
          />
          <Route 
            path="/discover" 
            element={
              <ProtectedRoute redirectTo="/">
                <Discover />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/create-notebook" 
            element={
              <ProtectedRoute redirectTo="/">
                <CreateNotebook />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks" 
            element={
              <ProtectedRoute redirectTo="/">
                <MyNotebooks />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks/:id" 
            element={
              <ProtectedRoute redirectTo="/">
                <SingleNotebook />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks/:id/:flashdeck-name" 
            element={
              <ProtectedRoute redirectTo="/">
                <Flashdeck />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks/:id/:flashdeck-name/create-card" 
            element={
              <ProtectedRoute redirectTo="/">
                <CreateFlashcard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks/:id/:flashdeck-name/:flashcard-name" 
            element={
              <ProtectedRoute redirectTo="/">
                <Flashcard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-notebooks/:id/note/:note-name" 
            element={
              <ProtectedRoute redirectTo="/">
                <Note />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
