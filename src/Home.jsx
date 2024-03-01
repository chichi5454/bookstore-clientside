/** @format */

// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
import Hero from "./Hero";

function Home() {
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of uploaded books
    axios
      .get("http://localhost:3001/uploaded-books")
      .then((response) => {
        setUploadedBooks(response.data);
      })
      .catch((error) => console.log(error));
  }, [setUploadedBooks]);

  const download = (pdfFile) => {
    axios({
      url: `http://localhost:3001${pdfFile}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, pdfFile);
    });
  };

  const handleAdd = () => {
    navigate("/books");
  };

  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <h4>Book List</h4>

      <div className="books-list">
        {uploadedBooks.map((book, index) => (
          <div key={index} className="book-details">
            <h3>Title: {book.title}</h3>
            <p>
              {" "}
              <strong>Description:</strong> {book.description}
            </p>
            <img
              src={`http://localhost:3001${book.coverImage}`}
              alt={`Cover for ${book.title}`}
              width="50px"
            />

            <button onClick={() => download(book.pdfFile)}>Download PDF</button>
          </div>
        ))}
      </div>
      <br />
      <div className="newbook-btn">
        <button onClick={handleAdd}>ADD NEW BOOK</button>
      </div>
    </div>
  );
}

export default Home;
