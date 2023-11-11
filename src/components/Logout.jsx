import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const signout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: "loggedout" });
            localStorage.removeItem("auth");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={signout}>Log Out</button>
        </div>
    );
}

export default Logout;
