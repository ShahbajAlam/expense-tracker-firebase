import { useEffect, useRef } from "react";

function MonthBar({ month, height }) {
    const monthRef = useRef();
    useEffect(() => {
        monthRef.current.style.height = height + "%";
    }, [height]);

    return (
        <div className="flex flex-col items-center justify-between w-4 h-full">
            <div className="w-full basis-[75%] bg-gradient-to-t from-[#3c1053] to-[#ad5389] rounded-full flex items-end">
                <div ref={monthRef} className="w-full rounded-full bg-white" />
            </div>
            <p className="month basis-[25%] text-center">{month}</p>
        </div>
    );
}

export default MonthBar;
