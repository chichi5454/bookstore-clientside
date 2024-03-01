/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ...

const Books = ({ setUploadedFiles }) => {
  const [file, setFile] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState(""); // Add state for title
  const [description, setDescription] = useState(""); // Add state for description
  const navigate = useNavigate(); // Get the history object from react-router-dom

  useEffect(() => {
    // Fetch the list of uploaded files
    axios
      .get("http://localhost:3001/uploaded-books")
      .then((response) => {
        setUploadedFiles(response.data);
      })
      .catch((error) => console.log(error));
  }, [setUploadedFiles]);

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title); // Add title to the form data
    formData.append("description", description); // Add description to the form data

    axios
      .post("http://localhost:3001/upload", formData)
      .then(() => {
        // After uploading, fetch the updated list of uploaded files
        axios
          .get("http://localhost:3001/uploaded-books")
          .then((response) => {
            setUploadedFiles(response.data); // Update the state in the App component
            navigate("/"); // Redirect to the homepage
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    // If coverImage is selected, also upload it using /upload-cover-image
    if (coverImage) {
      const coverFormData = new FormData();
      coverFormData.append("coverImage", coverImage);

      axios
        .post("http://localhost:3001/upload-cover-image", coverFormData)
        .then((response) => {
          console.log("Cover image uploaded:", response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <p>client side</p>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
      {/* <div>
        <input type="file" />
        <button>IMG UPLOAD</button>
      </div> */}

      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="button " onClick={upload}>
          Upload PDF
        </button>
      </div>
    </div>
  );
};

export default Books;
