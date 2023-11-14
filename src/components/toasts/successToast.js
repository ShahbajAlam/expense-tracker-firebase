import toast from "react-hot-toast";

function successToast(message) {
    toast.success(message, {
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

export { successToast };
