import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { errorToast } from "../toasts/errorToast";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LogInButton from "../buttons/LogInButton";
import SignInWithGoogleButton from "../buttons/SignInWithGoogleButton";

function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);
    const [isLoggingInWithGoogle, setIsLoggingInWithGoogle] = useState(false);
    const [isLoggingInWithPassword, setIsLoggingInWithPassword] =
        useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const reset = () => {
        setEmail("");
        setPassword("");
    };

    const logInWithPassword = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            errorToast("Please enter both email and password");
            return;
        }

        try {
            setIsLoggingInWithPassword(true);
            const res = await signInWithEmailAndPassword(auth, email, password);
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
            navigate("expenses");
        } catch (err) {
            errorToast(err.message);
        } finally {
            setIsLoggingInWithPassword(false);
        }
    };

    const logInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setIsLoggingInWithGoogle(true);
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
            navigate("/expenses");
        } catch (err) {
            errorToast(err.message);
        } finally {
            setIsLoggingInWithGoogle(false);
        }
    };

    return (
        <div className="w-[90%] px-6 py-4 rounded-xl bg-gradient-to-l from-[#325c69] to-[#2C5364] flex flex-col justify-center items-center text-gray-100 md:w-[65%] lg:w-[40%]">
            <Toaster />
            <form
                className="w-full flex flex-col justify-center items-start"
                onSubmit={logInWithPassword}
            >
                <EmailInput
                    email={email}
                    setEmail={setEmail}
                    isLoggingInWithPassword={isLoggingInWithPassword}
                    isLoggingInWithGoogle={isLoggingInWithGoogle}
                />

                <PasswordInput
                    hidden={hidden}
                    setHidden={setHidden}
                    password={password}
                    setPassword={setPassword}
                    isLoggingInWithGoogle={isLoggingInWithGoogle}
                    isLoggingInWithPassword={isLoggingInWithPassword}
                />

                <LogInButton
                    isLoggingInWithGoogle={isLoggingInWithGoogle}
                    isLoggingInWithPassword={isLoggingInWithPassword}
                />
            </form>

            <div className="w-full h-1 bg-gray-400 flex justify-center items-center my-9 rounded-md">
                <p className="text-sm bg-gray-400 px-2 py-1 rounded-lg text-gray-950 md:text-[1.3rem]">
                    OR
                </p>
            </div>

            <SignInWithGoogleButton
                isLoggingInWithGoogle={isLoggingInWithGoogle}
                logInWithGoogle={logInWithGoogle}
            />

            <div className="mt-4">
                <p className="text-[1.1rem] md:text-[1.3rem]">
                    New user?{" "}
                    <Link to="/signup" className="text-purple-300">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
