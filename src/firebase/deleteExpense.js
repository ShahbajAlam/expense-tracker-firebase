import { auth, db } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";

const deleteExpense = async (docID) => {
    console.log(auth?.currentUser?.uid);
    try {
        const docRef = doc(db, "expenses", docID);
        await deleteDoc(docRef);
    } catch (err) {
        console.error(err);
    }
};

export { deleteExpense };
