import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import SignUpButton from "../buttons/SignUpButton";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function SignUp() {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [isSigningUpWithPassword, setIsSigningUpWithPassword] =
        useState(false);

    const reset = () => {
        setEmail("");
        setPassword("");
    };

    const signUpWithPassword = async (e) => {
        e.preventDefault();

        try {
            setIsSigningUpWithPassword(true);
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const authInfo = {
                isAuth: true,
                userName:
                    res.user.displayName || res.user.email.split("@").at(0),
                photo: res.user.photoURL,
                userID: res.user.uid,
            };
            reset();
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
            navigate("/expenses");
        } catch (err) {
            errorToast(err.message);
        } finally {
            setIsSigningUpWithPassword(false);
        }
    };

    return (
        <div className="w-[90%] px-6 py-8 rounded-xl bg-gradient-to-tr from-[rgb(194,229,156)] to-[#64b3f4] flex flex-col justify-center items-center">
            <Toaster />
            <form
                className="w-full flex flex-col justify-center items-start"
                onSubmit={signUpWithPassword}
            >
                <EmailInput
                    email={email}
                    setEmail={setEmail}
                    isSigningUpWithPassword={isSigningUpWithPassword}
                />
                <PasswordInput
                    hidden={hidden}
                    setHidden={setHidden}
                    password={password}
                    setPassword={setPassword}
                    isSigningUpWithPassword={isSigningUpWithPassword}
                />
                <SignUpButton
                    isSigningUpWithPassword={isSigningUpWithPassword}
                />
            </form>

            <div className="mt-4">
                <p className="text-[1.1rem]">
                    Already an user?{" "}
                    <Link to="/" className="text-purple-950">
                        Go to login page
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
