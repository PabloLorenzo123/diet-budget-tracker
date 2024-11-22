import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";
import MealsSettingsBtn from "./MealsTable/MealsSettings/MealsSettingsBtn";

const Diary = ({meals, setMeals, currentDay, dailyTargets, selectedMealIdx, setSelectedMealIdx, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <AddFoodBtn
                    meals={meals}
                    setMeals={setMeals}
                    currentDay={currentDay}
                    dailyTargets={dailyTargets}
                />
                <MealsSettingsBtn
                    meals={meals}
                    setMeals={setMeals}
                    currentDay={currentDay}
                />
                
                
            </div>
            <MealsTable
                meals={meals}
                setMeals={setMeals}
                currentDay={currentDay}
                selectedMealIdx={selectedMealIdx}
                setSelectedMealIdx={setSelectedMealIdx}
                selectedFoodObj={selectedFoodObj}
                setSelectedFoodObj={setSelectedFoodObj}
            />
        </>
    )
}

export default Diary;
