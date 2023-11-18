import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useClickOutside } from "@react-hookz/web/esm/useClickOutside";

import { errorToast } from "../toasts/errorToast";
import { successToast } from "../toasts/successToast";
import { addExpense } from "../../firebase/addExpense";

function Modal({ setShowForm }) {
    const modalRef = useRef(null);
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    useClickOutside(modalRef, () => setShowForm(false));

    const reset = () => {
        setType("");
        setAmount("");
        setDate("");
    };

    const handleAddExpense = async () => {
        if (!type || !amount || !date) {
            errorToast("Enter values for all the fields");
            return;
        }

        if (amount < 0) {
            errorToast("Expense can not be a negative number");
            return;
        }

        setShowForm(false);

        const docID = await addExpense({ type, amount, date });
        if (docID) {
            reset();
            successToast("The expense is added successfully");
        }
    };

    return (
        <motion.div
            ref={modalRef}
            className="w-full relative z-10 px-4 py-6 rounded-xl flex justify-center items-center bg-gradient-to-l from-[#325c69] to-[#2C5364] md:w-[70%] md:p-6 lg:w-[40%]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <Toaster />
            <div className="w-full flex flex-col">
                <label
                    htmlFor="title"
                    className="text-[1.2rem] mb-1 md:text-[1.3rem]"
                >
                    Expense type
                </label>
                <input
                    type="text"
                    id="title"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.2rem] p-2 mb-2 text-gray-950 md:text-[1.3rem]"
                />

                <label
                    htmlFor="amount"
                    className="text-[1.2rem] mb-1 md:text-[1.3rem]"
                >
                    Expense amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.2rem] p-2 mb-2 text-gray-950 md:text-[1.3rem]"
                />

                <label
                    htmlFor="date"
                    className="text-[1.2rem] mb-1 md:text-[1.3rem]"
                >
                    Expense date
                </label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.2rem] p-2 mb-2 text-gray-950 md:text-[1.3rem]"
                />

                <button
                    onClick={handleAddExpense}
                    className="w-full bg-gradient-to-tr from-[#11998e] to-[#38ef7d] px-4 py-2 rounded-xl text-[1.3rem] text-gray-950 mt-2 md:text-[1.3rem] md:mt-4"
                >
                    Add Expense
                </button>
            </div>
        </motion.div>
    );
}

export default Modal;
