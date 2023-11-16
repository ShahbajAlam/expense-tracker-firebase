function SignUpButton({ isSigningUpWithPassword }) {
    return (
        <button
            type="submit"
            className="w-full bg-gradient-to-tr from-[#11998e] to-[#38ef7d] px-4 py-2 rounded-xl text-[1.2rem] text-gray-950 mt-2 md:text-[1.3rem]"
            disabled={isSigningUpWithPassword}
        >
            {isSigningUpWithPassword ? (
                <img src="load.svg" className="block mx-auto w-8 h-8" />
            ) : (
                "Sign up"
            )}
        </button>
    );
}

export default SignUpButton;
