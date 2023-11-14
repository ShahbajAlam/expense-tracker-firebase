function Backdrop({ children }) {
    return (
        <div className="fixed z-[5] inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex justify-center items-center p-4">
            {children}
        </div>
    );
}

export default Backdrop;
