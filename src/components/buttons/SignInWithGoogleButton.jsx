import { Fragment } from "react";

function SignInWithGoogleButton({ logInWithGoogle, isLoggingInWithGoogle }) {
    return (
        <button
            className="flex justify-center items-center w-full gap-2 bg-gradient-to-tr from-[#11998e] to-[#38ef7d] px-4 py-2 rounded-xl"
            onClick={logInWithGoogle}
            disabled={isLoggingInWithGoogle}
        >
            {isLoggingInWithGoogle ? (
                <img src="load.svg" className="block mx-auto w-8 h-8" />
            ) : (
                <Fragment>
                    <img
                        src="google.png"
                        className="w-[1.3rem] aspect-square"
                        alt="Google logo"
                    />
                    <p className="text-[1.2rem] text-gray-950 md:text-[1.3rem]">
                        Sign in with Google
                    </p>
                </Fragment>
            )}
        </button>
    );
}

export default SignInWithGoogleButton;
