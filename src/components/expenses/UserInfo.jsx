import { useState } from "react";
import { motion } from "framer-motion";

import AddExpense from "./AddExpense";
import { useAuth } from "../../contexts/AuthContext";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

function UserInfo() {
    const { photo, userName } = useAuth();
    const [showUserInfo, setShowUserInfo] = useState(false);

    return (
        <motion.div
            className="userInfo px-3 bg-gradient-to-l from-[#325c69] to-[#2C5364] flex justify-between items-center rounded-full text-gray-100 md:w-[70%] md:mx-auto lg:w-full lg:px-6 lg:py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="basis-[15%]">
                <img
                    role="button"
                    src={photo || "user.png"}
                    alt="user display picture"
                    className="w-[2.5rem] aspect-square rounded-full md:w-[3rem]"
                    onClick={() => setShowUserInfo(true)}
                />
                {showUserInfo && (
                    <UserInfoModal setShowUserInfo={setShowUserInfo} />
                )}
            </div>
            <h1 className="basis-[70%] text-center text-[1.1rem] md:text-[1.3rem]">
                Welcome,
                <p>{userName.length > 20 ? "User" : userName}</p>
            </h1>
            <AddExpense />
        </motion.div>
    );
}

export default UserInfo;
