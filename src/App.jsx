import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Expenses from "./components/Expenses";
import { useAuth } from "./contexts/AuthContext";

function App() {
    console.log(useAuth());
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("expenses");
        if (!isAuth) navigate("/");
    }, [isAuth]);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="expenses" element={<Expenses />} />
        </Routes>
    );
}

export default App;
