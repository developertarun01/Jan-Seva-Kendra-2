import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS or any styles are correctly imported

// Find the root element in your HTML
const rootElement = document.getElementById("root");

// Create a React root and render your app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
