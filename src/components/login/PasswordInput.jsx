import { Fragment } from "react";

function PasswordInput({
    hidden,
    setHidden,
    password,
    setPassword,
    isLoggingInWithPassword,
}) {
    return (
        <Fragment>
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
        </Fragment>
    );
}

export default PasswordInput;
