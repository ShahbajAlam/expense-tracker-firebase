import { Fragment } from "react";

function PasswordInput({
    hidden,
    setHidden,
    password,
    setPassword,
    isLoggingInWithGoogle,
    isLoggingInWithPassword,
}) {
    return (
        <Fragment>
            <label
                htmlFor="password"
                className="text-[1.2rem] mb-1 md:text-[1.3rem]"
            >
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
                    className="w-full bg-gray-50 outline-none  rounded-lg text-[1.2rem] p-2 text-gray-950 md:text-[1.3rem]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingInWithPassword || isLoggingInWithGoogle}
                />
            </div>
        </Fragment>
    );
}

export default PasswordInput;
