/* STYLESHEETS */
import "./styles/styles.css";
import "./styles/dashboard.css";

import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Discover from "./components/Discover/Discover";

export default function App() {
  return (
    <div className="app--container">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}