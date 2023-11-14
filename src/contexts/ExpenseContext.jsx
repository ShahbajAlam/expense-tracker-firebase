import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext(null);

const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
};

const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (context === undefined)
        throw new Error(
            "You are trying to access the context outside of its provider"
        );
    return context;
};

export { ExpenseProvider, useExpense };
