import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');
    </style>
    <App />
  </React.StrictMode>
);
