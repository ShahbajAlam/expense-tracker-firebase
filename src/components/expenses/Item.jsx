import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../../firebase/firebase";

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
        const docRef = doc(db, "expenses", docID);
        await deleteDoc(docRef);
    };

    return (
        <motion.li
            className="bg-gradient-to-l from-[#4AC29A] to-[#BDFFF3] rounded-xl px-3 py-2 mb-1 flex justify-between items-center gap-4 text-[1.1rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            layout
        >
            <div className="flex justify-between items-center basis-[90%] gap-3">
                <div className="flex flex-col justify-between items-center px-2">
                    <p className="text-3xl">{date.split("-")[2]}</p>
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
                className="w-[2rem] aspect-square"
                onClick={handleDeleteDoc}
            />
        </motion.li>
    );
}

export default Item;
