import { useState, useEffect } from "react";
import AddFoodModal from "./AddFoodModal";

import '../../../../styles/addFoodBtn/addFoodBtn.css';

const AddFoodBtn = ({meals, setMeals, currentDay, groceries, setGroceries, dailyTargets}) => {
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
                    currentDay={currentDay}
                    groceries={groceries}
                    setGroceries={setGroceries}
                    dailyTargets={dailyTargets}
                />
            }
            
        </>
    )
}

export default AddFoodBtn
