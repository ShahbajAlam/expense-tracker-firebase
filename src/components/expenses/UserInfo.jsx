import { useAuth } from "../../contexts/AuthContext";

function UserInfo() {
    const { photo, userName } = useAuth();

    const greet = () => {
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 0 && hour < 12) return "Good morning";
        else if (hour >= 12 && hour <= 18) return "Good afternoon";
        else return "Good evening";
    };

    return (
        <div className="userInfo py-2 px-3 bg-gradient-to-r from-[#11998e] to-[#38ef7d] flex justify-between items-center rounded-full">
            <div className="basis-[20%]">
                <img
                    src={photo}
                    alt="user display picture"
                    className="w-[2.75rem] aspect-square rounded-full"
                />
            </div>
            <h1 className="basis-[80%] text-center text-[1.2rem]">
                {greet()}, {userName}
            </h1>
        </div>
    );
}

export default UserInfo;
