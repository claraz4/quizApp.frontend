import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* STYLESHEETS */
import "./styles/styles.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
