/* STYLESHEETS */
import "./styles/styles.css";
import "./styles/dashboard.css";
import "./styles/sign-in-up.css";
import "./styles/create-notebook.css";
import "./styles/my-notebooks.css";

import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Discover from "./components/Discover/Discover";
import SignInUp from "./components/SignInUp/SignInUp";
import CreateNotebook from "./components/CreateNotebook/CreateNotebook";
import SingleNotebook from "./components/MyNotebooks/SingleNotebook";

export default function App() {
  return (
    <div className="app--container">
      <BrowserRouter>
        {/* display the dashboard only if signed in; this will be fixed later on */}
        <Dashboard />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInUp />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/create-notebook" element={<CreateNotebook />} />
          <Route path="/my-notebooks" element={<></>} />
          <Route path="/my-notebooks/:id" element={<SingleNotebook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}