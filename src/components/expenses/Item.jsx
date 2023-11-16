import { motion } from "framer-motion";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { errorToast } from "../toasts/errorToast";

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

function Item({ docID, type, amount, date }) {
    const handleDeleteDoc = async () => {
        try {
            const docRef = doc(db, "expenses", docID);
            await deleteDoc(docRef);
        } catch (err) {
            errorToast("Something went wrong, could not delete the expense");
        }
    };

    return (
        <motion.li
            className="bg-gradient-to-l from-[#43C6AC] to-[#BDFFF3] rounded-xl px-3 py-1 mb-1 flex justify-between items-center gap-4 text-[1.1rem] md:text-[1.3rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            layout
        >
            <div className="flex justify-between items-center basis-[90%] gap-3 text-center">
                <div className="flex flex-col justify-between items-center px-2">
                    <p className="text-xl md:text-2xl">{date.split("-")[2]}</p>
                    <p>{months[date.split("-")[1] - 1]}</p>
                    <p>{date.split("-")[0]}</p>
                </div>
                <p>{type}</p>
                <p>&#8377;{amount}</p>
            </div>
            <img
                src="delete.png"
                alt="delete button"
                role="button"
                className="w-[2rem] aspect-square md:w-[2.5rem]"
                onClick={handleDeleteDoc}
            />
        </motion.li>
    );
}

export default Item;
