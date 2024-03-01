/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./Books";
import Home from "./Home";
import React, { useState } from "react"; // Import useState
import "./Home.css";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Lift the state up

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home uploadedFiles={uploadedFiles} />} // Pass the state as a prop
          />
          <Route
            path="/books"
            element={<Books setUploadedFiles={setUploadedFiles} />} // Pass the state updater as a prop
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
