import "./styles/styles.css";
import "./styles/dashboard.css";
import "./styles/sign-in-up.css";
import "./styles/create-notebook.css";
import "./styles/my-notebooks.css";
import "./styles/flashdeck.css";
import "./styles/home.css";
import "./styles/note.css";
import './styles/TimerSelector.css';
import "./styles/QuizCard.css";
import "./styles/QuizList.css";
import './styles/CreateQuizPage.css';
import './styles/PreviewQuizModal.css';
import './styles/QuestionForm.css';
import "./styles/discover.css";
import "./styles/settings.css";
import "./styles/bookmark.css";
import "./styles/groups.css";
import "./styles/DisplayQuiz.css";

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
import Note from "./components/Note/Note";
import MyNotebooks from "./components/MyNotebooks/MyNotebooks";
import CreateQuizPage from "./components/Quiz/CreateQuizPage";
import ForgotPassword from "./components/SignInUp/ForgotPassword";
import VerificationCode from "./components/SignInUp/VerificationCode";
import NewPassword from "./components/SignInUp/NewPassword";
import Settings from "./components/Settings/Settings";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import MyGroups from "./components/Groups/MyGroups";
import DisplayQuiz from "./components/Quiz/DisplayQuiz";

export default function App() {
  const { token } = useAuthContext();
  const { showDashboard } = useShowDashboardContext();

  return (
    <div className="app--container">
      <DisplayQuiz/>
      {/* <BrowserRouter>
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
            path="/forgot-password" 
            element={
              !token ? <ForgotPassword /> : <Navigate to="/discover" replace />
            }
          />
          <Route 
            path="/verification-code" 
            element={
              !token ? <VerificationCode /> : <Navigate to="/discover" replace />
            }
          />
          <Route 
            path="/new-password" 
            element={
              !token ? <NewPassword /> : <Navigate to="/discover" replace />
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
            path="/groups" 
            element={
              <ProtectedRoute redirectTo="/">
                <MyGroups />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/groups/:id" 
            element={
              <ProtectedRoute redirectTo="/">
                <MyNotebooks />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/groups/:id/:id" 
            element={
              <ProtectedRoute redirectTo="/">
                <SingleNotebook />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/bookmarks" 
            element={
              <ProtectedRoute redirectTo="/">
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute redirectTo="/">
                <Settings />
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
            path="/my-notebooks/create-quiz" 
            element={
              <ProtectedRoute redirectTo="/">
                <CreateQuizPage />
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
      </BrowserRouter> */}
    </div>
  );
}