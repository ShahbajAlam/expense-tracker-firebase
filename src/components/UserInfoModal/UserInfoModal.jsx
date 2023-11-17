import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "@react-hookz/web/esm/useClickOutside";

import { useAuth } from "../../contexts/AuthContext";
import { useExpense } from "../../contexts/ExpenseContext";
import Backdrop from "../AddFormModal/Backdrop";

function UserInfoModal({ setShowUserInfo }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { expenses } = useExpense();
    const { userName, photo } = useAuth();
    useClickOutside(modalRef, () => setShowUserInfo(false));

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("auth");
    };

    return (
        <Backdrop>
            <motion.div
                ref={modalRef}
                className="w-full relative z-10 px-4 py-6 rounded-xl flex flex-col justify-center items-center text-gray-100 bg-gradient-to-l from-[#325c69] to-[#2C5364] md:w-[70%] md:p-6 lg:w-[40%]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <img
                    src={photo || "user.png"}
                    alt="user dp"
                    className="w-[8rem] aspect-square rounded-full mb-4 md:w-[10rem]"
                />
                <h1 className="text-2xl text-center mb-4 md:text-3xl">
                    Hi, {userName.length > 20 ? "User" : userName}
                </h1>
                <p
                    style={{ textWrap: "balance" }}
                    className="text-center md:text-[1.3rem]"
                >
                    {expenses.length > 0
                        ? expenses.length > 1
                            ? `You have total ${expenses.length} expenses saved`
                            : `You have total ${expenses.length} expense saved`
                        : "You have not added any expense yet"}
                </p>
                <button
                    className="w-full bg-gradient-to-tr from-[#11998e] to-[#38ef7d] px-4 py-2 rounded-xl text-[1.2rem] text-gray-950 mt-4 md:text-[1.3rem]"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </motion.div>
        </Backdrop>
    );
}

export default UserInfoModal;
