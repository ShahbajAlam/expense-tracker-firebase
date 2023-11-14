import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useClickOutside } from "@react-hookz/web/esm/useClickOutside";

import { errorToast } from "../toasts/errorToast";
import { successToast } from "../toasts/successToast";
import { addExpense } from "../../firebase/addExpense";

function Modal({ setShowForm }) {
    const modalRef = useRef(null);
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    useClickOutside(modalRef, () => setShowForm(false));

    const reset = () => {
        setType("");
        setAmount("");
        setDate("");
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!type || !amount || !date) {
            errorToast("Enter values for all the fields");
            return;
        }
        const docID = await addExpense({ type, amount, date });
        if (docID) {
            reset();
            successToast("The expense is added successfully");
            setShowForm(false);
        }
    };

    return (
        <div
            ref={modalRef}
            className="w-full relative z-10 px-4 py-6 rounded-xl flex justify-center items-center bg-gradient-to-tr from-[#c2e59c] to-[#64b3f4]"
        >
            <Toaster />
            <form onSubmit={handleAddExpense} className="w-full flex flex-col">
                <label htmlFor="title" className="text-[1.2rem] mb-2">
                    Expense type
                </label>
                <input
                    type="text"
                    id="title"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                />

                <label htmlFor="amount" className="text-[1.2rem] mb-2">
                    Expense amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                />

                <label htmlFor="date" className="text-[1.2rem] mb-2">
                    Expense date
                </label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                />

                <button
                    type="submit"
                    className="w-full bg-[#2c5eaf] px-4 py-2 rounded-xl text-[1.3rem] text-gray-50 mt-2"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
}

export default Modal;
