import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExpense } from "../firebase/deleteExpense";
import Logout from "./Logout";

function Expenses() {
    const handleDelete = () => {
        deleteExpense("5fpKPWcz1zpuOadOcyW1");
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Expense</button>
            <Logout />
        </div>
    );
}

export default Expenses;
