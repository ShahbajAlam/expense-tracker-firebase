import { useRef } from "react";
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
            <div
                ref={modalRef}
                className="w-full relative z-10 px-4 py-6 rounded-xl flex flex-col justify-center items-center bg-gradient-to-tr from-[#c2e59c] to-[#64b3f4]"
            >
                <img
                    src={photo || "user.png"}
                    alt="user dp"
                    className="w-[8rem] aspect-square rounded-full mb-4"
                />
                <h1 className="text-2xl text-center mb-4">
                    Hi, {userName.length > 20 ? "User" : userName}
                </h1>
                <p>You have total {expenses.length} expenses saved</p>
                <button
                    className="w-full bg-[#2c5eaf] px-4 py-2 rounded-xl text-[1.3rem] text-gray-50 mt-4"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </Backdrop>
    );
}

export default UserInfoModal;
