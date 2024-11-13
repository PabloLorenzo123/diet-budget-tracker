import { useState, useEffect } from "react";
import AddFoodModal from "./AddFoodModal";

import '../../../../styles/addFoodBtn/AddFoodBtn.css';

const AddFoodBtn = ({meals, setMeals, dailyTargets}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="day-options p-1">
                <button className="btn btn-secondary" onClick={() => setShowModal(true)}>Add Food</button>
            </div>

            {
                showModal &&
                <AddFoodModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    meals={meals}
                    setMeals={setMeals}
                    dailyTargets={dailyTargets}
                />
            }
            
        </>
    )
}

export default AddFoodBtn
