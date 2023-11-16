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

const initialState = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
};

function Chart() {
    const { expenses } = useExpense();
    const [yearForChart, setYearForChart] = useState("");
    const [years, setYears] = useState([]);
    const [monthlyExpense, setMonthlyExpense] = useState(initialState);
    const perMonthExpense = Object.values(monthlyExpense);
    const highestExpense = Object.values(monthlyExpense).sort(
        (a, b) => b - a
    )[0];

    const monthWiseExpense = (e) => {
        setYearForChart(e.target.value);

        const activeMonths = expenses
            .filter((ex) => ex.date.split("-")[0] === e.target.value)
            .map((el) => el.date.split("-")[1] - 1);

        const activeAmounts = expenses
            .filter((ex) => ex.date.split("-")[0] === e.target.value)
            .map((el) => el.amount);

        let obj = {};
        activeMonths.forEach((mon, idx) => {
            obj[months[mon].toLowerCase()] = activeAmounts[idx];
        });

        setMonthlyExpense({ ...initialState, ...obj });
    };

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
        setYearForChart(years[0]);
        const activeMonths = expenses
            .filter((ex) => ex.date.split("-")[0] === years[0])
            .map((el) => el.date.split("-")[1] - 1);

        const activeAmounts = expenses
            .filter((ex) => ex.date.split("-")[0] === years[0])
            .map((el) => el.amount);

        let obj = {};
        activeMonths.forEach((mon, idx) => {
            obj[months[mon].toLowerCase()] = activeAmounts[idx];
        });

        setMonthlyExpense({ ...initialState, ...obj });
    }, [years]);

    return (
        <div className="m-0 flex flex-col justify-end text-gray-100 md:w-[70%] md:mx-auto lg:w-full">
            {years.length > 0 && (
                <div className="flex justify-between items-center  px-2 md:text-xl">
                    <p className="text-center">Year : {yearForChart}</p>
                    <select
                        value={yearForChart}
                        onChange={(e) => monthWiseExpense(e)}
                        className="border-none outline-none rounded-md py-1 bg-[#28282B] cursor-pointer"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="chart flex justify-evenly items-center w-full py-2 bg-gradient-to-tr from-[#136a8a] to-[#267871] rounded-xl md:py-3">
                {months.map((month, i) => (
                    <MonthBar
                        key={month}
                        month={month}
                        height={
                            (perMonthExpense[i] / highestExpense) * 100 || 0
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Chart;
