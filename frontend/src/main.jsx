import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Router/App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="183227525522-m3b8d9vt3fiu6q9m2pfrpp9vejafgo9i.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
