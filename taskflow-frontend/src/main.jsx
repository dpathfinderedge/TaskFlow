import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from './contexts/AuthContext.jsx'
import App from "./App";
import './index.css'
import { StateProvider } from "./contexts/StateContext.jsx";
// import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </AuthProvider>
  </React.StrictMode>
);
