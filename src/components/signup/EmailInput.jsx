import { Fragment } from "react";

function EmailInput({ email, setEmail, isSigningUpWithPassword }) {
    return (
        <Fragment>
            <label
                htmlFor="email"
                className="text-[1.2rem] mb-1 md:text-[1.3rem]"
            >
                Email ID
            </label>
            <input
                id="email"
                type="email"
                className="w-full bg-gray-50 outline-none rounded-lg text-[1.2rem] p-2 mb-2 text-gray-950 md:text-[1.3rem]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSigningUpWithPassword}
            />
        </Fragment>
    );
}

export default EmailInput;
