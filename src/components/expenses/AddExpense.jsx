import { useState } from "react";

import Backdrop from "../AddFormModal/Backdrop";
import Modal from "../AddFormModal/Modal";

function AddExpense() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="basis-[15%] flex justify-end">
            <div onClick={() => setShowForm(true)}>
                <img
                    src="add.png"
                    alt="add logo"
                    className="w-[3rem] aspect-square rounded-full"
                />
            </div>
            {showForm && (
                <Backdrop>
                    <Modal setShowForm={setShowForm} />
                </Backdrop>
            )}
        </div>
    );
}

export default AddExpense;
