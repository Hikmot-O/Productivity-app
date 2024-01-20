import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../store/auth-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
