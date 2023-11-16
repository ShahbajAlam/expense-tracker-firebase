import toast from "react-hot-toast";

function errorToast(errorMessage) {
    if (errorMessage.includes("invalid-login-credentials"))
        errorMessage = "Invalid login credentials";
    if (errorMessage.includes("email-already-in-use"))
        errorMessage = "You are already registered, try to login";
    if (errorMessage.includes("too-many-requests"))
        errorMessage = "Temporarily disabled due to multiple failed attempts";
    if (errorMessage.includes("popup-closed-by-user"))
        errorMessage = "Oops !! You closed the popup";
    if (errorMessage.includes("weak-password"))
        errorMessage = "Password should be atleast 6 characters long";

    toast.error(errorMessage, {
        duration: 2500,
        id: Date.now().toString(),
        position: "top-center",
        style: {
            padding: 8,
            paddingInline: 16,
            borderRadius: 36,
            textAlign: "center",
            wordWrap: "break-word",
        },
    });
}

export { errorToast };
