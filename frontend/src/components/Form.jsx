import React, { useState } from "react";

export default function Form({ fields, onSubmit, page }) {
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
                <p>Already Register ?</p>
              </div>
            </>
          )}
          {page === "Login" && (
            <>
              <div className="forgot-password">
                <p>Forgot password ?</p>
              </div>
              <div className="already-register">
                <p>Not register yet?</p>
              </div>
            </>
          )}
        </div>
        <div className="submit-btn">
          <input type="submit" />
        </div>
      </form>
    </>
  );
}
