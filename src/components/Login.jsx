import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const signin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            const authInfo = {
                isAuth: true,
                userName: res.user.displayName,
                photo: res.user.photoURL,
                userID: res.user.uid,
            };
            dispatch({
                type: "loggedin",
                payload: {
                    isAuth: authInfo.isAuth,
                    userName: authInfo.userName,
                    photo: authInfo.photo,
                    userID: authInfo.userID,
                },
            });
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("expenses");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={signin}>Sign In with Google</button>
            <br />
        </div>
    );
}

export default Login;
