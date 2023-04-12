import React from "react";
import ReactDOM from "react-dom/client";

// Dependencies
import { BrowserRouter } from "react-router-dom";

// App
import "./css/index.css";
import App from "./App";

// Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
