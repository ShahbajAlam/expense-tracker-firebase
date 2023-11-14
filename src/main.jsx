import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ExpenseProvider } from "./contexts/ExpenseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ExpenseProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ExpenseProvider>
    </AuthProvider>
);
