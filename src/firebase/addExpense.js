import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import { errorToast } from "../components/toasts/errorToast";

const addExpense = async (expenseObj) => {
    try {
        const collectionRef = collection(db, "expenses");
        const res = await addDoc(collectionRef, {
            ...expenseObj,
            userID: auth?.currentUser?.uid,
        });
        return res.id;
    } catch (err) {
        errorToast("Something went wrong, could not add the expense");
    }
};

export { addExpense };
