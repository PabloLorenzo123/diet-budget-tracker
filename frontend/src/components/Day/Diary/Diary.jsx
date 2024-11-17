import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";

const Diary = ({meals, dailyTargets, setMeals, selectedMeal, setSelectedMeal, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <AddFoodBtn
                    meals={meals}
                    setMeals={setMeals}
                    dailyTargets={dailyTargets}
                />
                <button className="bg-transparent border-0 p-0">
                    <span className="material-symbols-outlined">
                        settings
                    </span>
                </button>
                
            </div>
            <MealsTable
                meals={meals}
                setMeals={setMeals}
                selectedMeal={selectedMeal}
                setSelectedMeal={setSelectedMeal}
                selectedFoodObj={selectedFoodObj}
                setSelectedFoodObj={setSelectedFoodObj}
            />
        </>
    )
}

export default Diary;
