import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "next-themes";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider attribute="class">
    <App />
  </ThemeProvider>
);