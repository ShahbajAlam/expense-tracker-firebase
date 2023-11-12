import { Fragment } from "react";

function SignInWithGoogleButton({ logInWithGoogle, isLoggingInWithGoogle }) {
    return (
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
    );
}

export default SignInWithGoogleButton;
