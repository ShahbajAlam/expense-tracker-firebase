import { useState } from "react";

import AddExpense from "./AddExpense";
import { useAuth } from "../../contexts/AuthContext";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

function UserInfo() {
    const { photo, userName } = useAuth();
    const [showUserInfo, setShowUserInfo] = useState(false);

    return (
        <div className="userInfo px-3 bg-gradient-to-r from-[#11998e] to-[#38ef7d] flex justify-between items-center rounded-full">
            <div className="basis-[15%]">
                <img
                    src={photo || "user.png"}
                    alt="user display picture"
                    className="w-[3rem] aspect-square rounded-full"
                    onClick={() => setShowUserInfo(true)}
                />
                {showUserInfo && (
                    <UserInfoModal setShowUserInfo={setShowUserInfo} />
                )}
            </div>
            <h1 className="basis-[70%] text-center text-[1.2rem]">
                Welcome,
                <p>{userName.length > 20 ? "User" : userName}</p>
            </h1>
            <AddExpense />
        </div>
    );
}

export default UserInfo;
