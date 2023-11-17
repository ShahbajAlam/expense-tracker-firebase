import { motion } from "framer-motion";
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
                expense.type
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
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
        <motion.div
            className="lists p-3 bg-gradient-to-tr from-[#2c3e50] to-[#2980b9] rounded-xl md:w-[70%] md:mx-auto md:px-5 lg:w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
        >
            <div className="flex justify-between items-center h-[10%]">
                <img
                    src="sort.png"
                    alt="sort by price button"
                    className="w-[2rem] aspect-square md:w-[2.75rem]"
                    role="button"
                    onClick={sortByPrice}
                />

                <input
                    type="text"
                    placeholder={`search by ${searchBy}...`}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-none outline-none rounded-md py-1 px-2 w-[55%] md:text-lg md:py-2"
                />

                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="border-none outline-none rounded-md py-1 w-[25%] md:py-2 md:text-lg cursor-pointer"
                >
                    <option value="type">Type</option>
                    <option value="year">Year</option>
                    <option value="amount">Amount</option>
                </select>
            </div>

            <ul className="overflow-auto py-2 h-[90%] rounded-lg relative">
                {isDocsLoading && (
                    <img
                        src="loading.svg"
                        alt="loading animation"
                        width={100}
                        height={100}
                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    />
                )}
                {!isDocsLoading && filteredExpenses.length === 0 && (
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] w-full p-6 translate-y-[-50%] flex flex-col justify-center items-center text-gray-100">
                        <img
                            src="notfound.png"
                            alt="not found"
                            width={50}
                            height={50}
                        />
                        <h1 className="text-lg mt-6 text-center md:text-xl md:px-6">
                            No expense found, add new by clicking the{" "}
                            <img
                                src="add.png"
                                alt="add button"
                                width={25}
                                height={25}
                                className="inline"
                            />{" "}
                            icon
                        </h1>
                    </div>
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
        </motion.div>
    );
}

export default Lists;
