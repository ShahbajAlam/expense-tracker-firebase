import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useExpense } from "../../contexts/ExpenseContext";
import Item from "./Item";

function Lists() {
    const { userID } = useAuth();
    const { expenses, setExpenses } = useExpense();
    const [isDocsLoading, setIsDocsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("asc");
    const [searchBy, setSearchBy] = useState("type");
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        setFilteredExpenses([...expenses]);
    }, [expenses]);

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
            docs.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(docs);
            setIsDocsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        if (searchBy === "type") {
            const data = expenses.filter((expense) =>
                expense.type.toLowerCase().includes(e.target.value)
            );
            setFilteredExpenses([...data]);
        }
        if (searchBy === "year") {
            const data = expenses.filter((expense) =>
                expense.date.split("-").at(0).includes(e.target.value)
            );
            setFilteredExpenses([...data]);
        }
        if (searchBy === "amount") {
            console.log("hi");
            const data = expenses.filter((expense) =>
                String(expense.amount).includes(e.target.value)
            );
            setFilteredExpenses([...data]);
        }
    };

    const sortByPrice = () => {
        if (sort === "asc") {
            setSort("desc");
            const data = filteredExpenses.sort((a, b) => a.amount - b.amount);
            setFilteredExpenses([...data]);
        }

        if (sort === "desc") {
            setSort("asc");
            const data = filteredExpenses.sort((a, b) => b.amount - a.amount);
            setFilteredExpenses([...data]);
        }
    };

    return (
        <div className="lists p-3 bg-blue-500 rounded-xl">
            <div className="flex justify-between items-center h-[10%]">
                <img
                    src="sort.png"
                    alt="sort by price button"
                    className="w-[2rem] aspect-square"
                    role="button"
                    onClick={sortByPrice}
                />

                <input
                    type="text"
                    placeholder={`search by ${searchBy}...`}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-none outline-none rounded-md py-1 px-2"
                />

                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="border-none outline-none rounded-md py-1"
                >
                    <option value="type">Type</option>
                    <option value="year">Year</option>
                    <option value="amount">Amount</option>
                </select>
            </div>

            <ul className="overflow-auto py-2 h-[90%] rounded-lg">
                {isDocsLoading && <h1>Loading...</h1>}
                {!isDocsLoading && filteredExpenses.length === 0 && (
                    <h1>No record found...</h1>
                )}
                {filteredExpenses.length > 0 &&
                    filteredExpenses.map((expense) => (
                        <Item
                            key={expense.docID}
                            docID={expense.docID}
                            type={expense.type}
                            amount={expense.amount}
                            date={expense.date}
                        />
                    ))}
            </ul>
        </div>
    );
}

export default Lists;
