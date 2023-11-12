import UserInfo from "./UserInfo";
import Chart from "./Chart";
import Lists from "./Lists";
import AddExpense from "./AddExpense";

function Expenses() {
    return (
        <div className="w-full p-2 min-h-screen appContainer">
            <UserInfo />
            <Chart />
            <Lists />
            <AddExpense />
        </div>
    );
}

export default Expenses;
