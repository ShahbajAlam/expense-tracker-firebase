import UserInfo from "./UserInfo";
import Chart from "./Chart";
import Lists from "./Lists";

function Expenses() {
    return (
        <div className="w-full p-2 py-4 min-h-screen appContainer">
            <UserInfo />
            <Chart />
            <Lists />
        </div>
    );
}

export default Expenses;
