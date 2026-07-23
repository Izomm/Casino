/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom/client";
import "react-markdown-editor-lite/lib/index.css";
// import "./index.css";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById("root"));
