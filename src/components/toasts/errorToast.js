import toast from "react-hot-toast";

function errorToast(errorMessage) {
    if (errorMessage.includes("invalid-login-credentials"))
        errorMessage = "Invalid login credentials";
    else if (errorMessage.includes("email-already-in-use"))
        errorMessage = "You are already registered, try to login";
    else errorMessage = "Something went wrong, please try again";

    console.log(errorMessage);

    toast.error(errorMessage, {
        duration: 2500,
        id: Date.now().toString(),
        position: "top-center",
        style: {
            padding: 8,
            paddingInline: 24,
            borderRadius: 36,
            textAlign: "center",
            wordWrap: "break-word",
        },
    });
}

export { errorToast };
