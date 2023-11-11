import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";

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

        try {
            setIsLoggingInWithPassword(true);
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
            navigate("expenses");
        } catch (err) {
            console.error(err);
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
            navigate("expenses");
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoggingInWithGoogle(false);
        }
    };

    return (
        <div className="w-[90%] px-6 py-8 rounded-xl bg-gradient-to-tr from-[#c2e59c] to-[#64b3f4] flex flex-col justify-center items-center">
            <form
                className="w-full flex flex-col justify-center items-start"
                onSubmit={logInWithPassword}
            >
                <label htmlFor="email" className="text-[1.2rem] mb-2">
                    Email ID
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full bg-gray-50 outline-none rounded-lg text-[1.3rem] p-2 mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingInWithPassword}
                />

                <label htmlFor="password" className="text-[1.2rem] mb-2">
                    Password
                </label>
                <div className="w-full relative mb-3">
                    <img
                        role="button"
                        onClick={() => setHidden((e) => !e)}
                        src={hidden ? "hidden.png" : "view.png"}
                        className="absolute top-[50%] right-2 translate-y-[-50%] w-[1.3rem] aspect-square"
                        alt="eye icon"
                    />
                    <input
                        type={hidden ? "password" : "text"}
                        id="password"
                        className="w-full bg-gray-50 outline-none  rounded-lg text-[1.3rem] p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoggingInWithPassword}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#2c5eaf] px-4 py-2 rounded-xl text-[1.3rem] text-gray-50 mt-2"
                    disabled={isLoggingInWithPassword}
                >
                    {isLoggingInWithPassword ? "Logging in..." : "Log in"}
                </button>
            </form>

            <div className="w-full h-1 bg-gray-400 flex justify-center items-center my-9 rounded-md">
                <p className="text-lg bg-gray-100 px-2 rounded-lg">OR</p>
            </div>

            <button
                className="flex justify-center items-center w-full gap-2 bg-[#2c5eaf] px-4 py-2 rounded-xl"
                onClick={logInWithGoogle}
                disabled={isLoggingInWithGoogle}
            >
                {isLoggingInWithGoogle ? (
                    <p className="text-[1.3rem] text-gray-50">Logging in...</p>
                ) : (
                    <Fragment>
                        <img
                            src="google.png"
                            className="w-[1.3rem] aspect-square"
                            alt="Google logo"
                        />
                        <p className="text-[1.3rem] text-gray-50">
                            Sign in with Google
                        </p>
                    </Fragment>
                )}
            </button>
        </div>
    );
}

export default Login;
