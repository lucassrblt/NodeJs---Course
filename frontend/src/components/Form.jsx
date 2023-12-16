import React from "react";

export default function Form({ fields, handleSubmit, page }) {
  return (
    <>
      <form action="" className="form">
        {fields.map((field) => {
          return (
            <div className="label-input-container">
              <label htmlFor="" className="label">
                {field.label}
              </label>
              <input type={field.type} placeholder={field.placeholder} />
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
