import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const addExpense = async (expenseObj) => {
    try {
        const collectionRef = collection(db, "expenses");
        const res = await addDoc(collectionRef, {
            ...expenseObj,
            userID: auth?.currentUser?.uid,
        });
        return res.id;
    } catch (err) {
        console.error(err.message);
    }
};

export { addExpense };
