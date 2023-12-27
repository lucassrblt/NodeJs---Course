import React from "react";
import Form from "../components/Form.jsx";
import Terms from "../components/Terms.jsx";
import { useState } from "react";
import sendData from "../functions/sendData.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);

  const sendData = async (formData, url) => {
    const requestOptions = {
      method: "POST",
      body: formData, // Transforme l'objet JS en JSON
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const responseServer = await response.json();
      console.log(responseServer);
      return responseServer;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = document.getElementById("upload");
    const fileValue = file.files[0];
    console.log(fileValue);
    if (firstName && lastName && fileValue) {
      formData.append("id", id);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("fileValue", fileValue);
      const response = await sendData(
        formData,
        "http://localhost:3001/api/profile"
      );
      if (response.status === "SUCCESS") {
        navigate("/login");
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="view">
      <div className="register-container">
        <div className="title-subtitle">
          <div className="title">
            <h2>Profile</h2>
          </div>
          <div className="subtitle">
            <h6>Complete your profile</h6>
          </div>
        </div>
        <div className="form-container">
          <form
            action=""
            className="form"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="label-input-container">
              <label htmlFor="" className="label">
                First Name :
              </label>
              <input
                type="text"
                placeholder="Enter your First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="" className="label">
                Last Name :
              </label>
              <input
                type="text"
                placeholder="Enter your Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="label-input-container">
              <input type="file" id="upload" name="fileValue" />
            </div>
            <div className="submit-btn">
              <input type="submit" />
            </div>
            <div className="error">
              {error && <h1>Please fill all fields</h1>}
            </div>
          </form>
        </div>
        <Terms />
      </div>
    </div>
  );
}
