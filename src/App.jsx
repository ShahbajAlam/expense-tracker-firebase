import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/login/LogIn";
import Expenses from "./components/expenses/Expenses";
import SignUp from "./components/signup/SignUp";
import { useAuth } from "./contexts/AuthContext";

function App() {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("/expenses");
        if (!isAuth) navigate("/");
    }, [isAuth]);

    return (
        <div className="min-h-screen bg-[#28282B] flex justify-center items-center lg:px-8">
            <Toaster />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/expenses" element={<Expenses />} />
            </Routes>
        </div>
    );
}

export default App;

