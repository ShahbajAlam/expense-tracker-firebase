import { useEffect, useState } from "react";
import { useExpense } from "../../contexts/ExpenseContext";
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
    const { expenses } = useExpense();
    const [years, setYears] = useState([]);
    const [year, setYear] = useState("");

    useEffect(() => {
        setYears([
            ...new Set(
                expenses
                    .map((expense) => expense.date.split("-")[0])
                    .sort((a, b) => b - a)
            ),
        ]);
    }, [expenses]);

    useEffect(() => {
        setYear(years[0]);
    }, [years]);

    return (
        <div className="m-0">
            {years.length > 0 && (
                <div className="flex justify-between items-center  px-2">
                    <p className="text-center">Year : {year}</p>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="chart flex justify-evenly items-center w-full py-3 bg-green-400 rounded-xl">
                {months.map((month) => (
                    <MonthBar key={month} month={month} height={21} />
                ))}
            </div>
        </div>
    );
}

export default Chart;
