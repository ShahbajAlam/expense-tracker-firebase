import { useEffect, useRef } from "react";

function MonthBar({ month, height }) {
    const monthRef = useRef();
    useEffect(() => {
        monthRef.current.style.height = height + "%";
    }, [height]);

    return (
        <div className="flex flex-col items-center justify-between w-4 h-full md:w-6 lg:w-4">
            <div className="w-full basis-[75%] bg-gradient-to-t from-[#A1FFCE] to-[#FAFFD1] rounded-full flex items-end">
                <div
                    ref={monthRef}
                    className="overflow-hidden w-full rounded-full bg-gradient-to-t from-[#e73535] to-[#ee4a42] duration-1000"
                />
            </div>
            <p className="month basis-[25%] text-center text-sm md:text-lg">{month}</p>
        </div>
    );
}

export default MonthBar;
