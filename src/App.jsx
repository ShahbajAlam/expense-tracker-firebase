import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Expenses from "./components/Expenses";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="expenses" element={<Expenses />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

// bg-gradient-to-t from-[#237A57] to-[#093028]
