import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TrendProvider } from "./context/TrendProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TrendProvider>
      <App />
    </TrendProvider>
  </React.StrictMode>
);
