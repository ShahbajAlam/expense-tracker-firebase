function SignUpButton({ isSigningUpWithPassword }) {
    return (
        <button
            type="submit"
            className="w-full bg-[#2c5eaf] px-4 py-2 rounded-xl text-[1.3rem] text-gray-50 mt-2"
            disabled={isSigningUpWithPassword}
        >
            {isSigningUpWithPassword ? "Signing up..." : "Sign up"}
        </button>
    );
}

export default SignUpButton;
