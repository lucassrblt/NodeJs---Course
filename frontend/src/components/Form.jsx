import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form({ fields, onSubmit, page, setError }) {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={SubmitForm} className="form">
        {fields.map((field, index) => {
          return (
            <div className="label-input-container" key={index}>
              <label htmlFor="" className="label">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            </div>
          );
        })}
        <div className="links">
          {page === "Register" && (
            <>
              <div className="already-register">
                <p onClick={() => navigate("/login")}>Already Register ?</p>
              </div>
            </>
          )}
          {page === "Login" && (
            <>
              <div className="already-register">
                <p onClick={() => navigate("/register")}>Not register yet?</p>
              </div>
            </>
          )}
        </div>
        <div className="submit-btn">
          <input type="submit" className={setError ? "shake" : undefined} />
        </div>
      </form>
    </>
  );
}
