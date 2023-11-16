import { useState } from "react";

import Backdrop from "../AddFormModal/Backdrop";
import Modal from "../AddFormModal/Modal";

function AddExpense() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="basis-[15%] flex justify-end">
            <div onClick={() => setShowForm(true)}>
                <img
                    role="button"
                    src="add.png"
                    alt="add logo"
                    className="w-[2.5rem] aspect-square rounded-full md:w-[3rem]"
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
