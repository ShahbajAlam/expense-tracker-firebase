import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useExpense } from "../../contexts/ExpenseContext";

function Lists() {
    const { userID } = useAuth();
    const { expenses, setExpenses } = useExpense();
    const [isDocsLoading, setIsDocsLoading] = useState(true);

    useEffect(() => {
        const collectionRef = collection(db, "expenses");
        const expenseQuery = query(
            collectionRef,
            where("userID", "==", userID)
        );
        const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                docs.push({ ...doc.data(), docID: doc.id });
            });
            setExpenses(docs);
            setIsDocsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (expenses.length === 0 && !isDocsLoading)
        return (
            <div className="lists p-3 bg-blue-500 rounded-xl flex justify-center items-center">
                <h1>No record found...</h1>
            </div>
        );

    if (isDocsLoading)
        return (
            <div className="lists p-3 bg-blue-500 rounded-xl flex justify-center items-center">
                <h1>Loading...</h1>
            </div>
        );

    if (expenses.length > 0)
        return (
            <div className="lists p-3 bg-blue-500 rounded-xl">
                <div className="flex justify-between items-center h-[10%]">
                    <button>Sort by amount</button>
                    <select id="filter">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>

                <ul className="overflow-auto py-2 h-[90%] rounded-lg">
                    <li className="bg-gray-200 rounded-lg p-2 mb-1">
                        <p>TYPE: </p>
                    </li>
                </ul>
            </div>
        );
}

export default Lists;
