import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../firebase/addExpense";

function Expenses() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setName(user.displayName);
            else navigate("/");
        });
    }, [auth]);

    if (!name) return null;

    return (
        <div>
            {/* Hey {name} */}
            <button onClick={() => signOut(auth)}>Sign Out</button>
            <button
                onClick={addExpense.bind(null, {
                    title: "TV",
                    amount: "30000",
                })}
            >
                Add Expense
            </button>
        </div>
    );
}

export default Expenses;
