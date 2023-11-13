import { useRef } from "react";
import { useClickOutside } from "@react-hookz/web/esm/useClickOutside";

function Modal({ onAddExpense, setShowForm }) {
    const modalRef = useRef(null);
    useClickOutside(modalRef, () => setShowForm((e) => !e));

    return (
        <div
            ref={modalRef}
            className="w-full relative z-10 px-4 py-6 rounded-xl flex justify-center items-center bg-gradient-to-tr from-[#c2e59c] to-[#64b3f4]"
        >
            <form onSubmit={onAddExpense} className="w-full flex flex-col">
                <label htmlFor="title" className="text-[1.2rem] mb-2">
                    Expense type
                </label>
                <input
                    type="text"
                    id="title"
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                />

                <label htmlFor="amount" className="text-[1.2rem] mb-2">
                    Expense amount
                </label>
                <input
                    type="number"
                    id="amount"
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                />

                <label htmlFor="date" className="text-[1.2rem] mb-2">
                    Expense date
                </label>
                <input
                    type="date"
                    id="date"
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
