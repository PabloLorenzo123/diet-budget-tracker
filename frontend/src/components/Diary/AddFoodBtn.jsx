import { useState, useEffect } from "react";
import Modal from "./Modal";

const AddFoodBtn = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="day-options p-1">
                <button className="btn btn-secondary" onClick={() => setShowModal(true)}>Add Food</button>
            </div>

            {showModal && <Modal setShow={setShowModal}/>}
            
        </>
    )
}

export default AddFoodBtn
