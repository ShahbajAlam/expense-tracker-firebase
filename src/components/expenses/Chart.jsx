import MonthBar from "./MonthBar";

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

function Chart() {
    return (
        <div className="chart flex justify-evenly items-center w-full py-3 mt-3 bg-green-400 rounded-xl">
            {months.map((month) => (
                <MonthBar key={month} month={month} height={21} />
            ))}
        </div>
    );
}

export default Chart;
