import { useState } from "react";

import AddExpense from "./AddExpense";
import { useAuth } from "../../contexts/AuthContext";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

function UserInfo() {
    const { photo, userName } = useAuth();
    const [showUserInfo, setShowUserInfo] = useState(false);

    return (
        <div className="userInfo px-3 bg-gradient-to-l from-[#325c69] to-[#2C5364] flex justify-between items-center rounded-full text-gray-100 md:w-[70%] md:mx-auto lg:w-full lg:px-6 lg:py-2">
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
        </div>
    );
}

export default UserInfo;
