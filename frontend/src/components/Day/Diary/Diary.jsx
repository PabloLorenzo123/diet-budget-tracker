import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";
import MealsSettingsBtn from "./MealsTable/MealsSettings/MealsSettingsBtn";

const Diary = ({meals, dailyTargets, setMeals, selectedMealIdx, setSelectedMealIdx, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <AddFoodBtn
                    meals={meals}
                    setMeals={setMeals}
                    dailyTargets={dailyTargets}
                />
                <MealsSettingsBtn
                    meals={meals}
                    setMeals={setMeals}
                />
                
                
            </div>
            <MealsTable
                meals={meals}
                setMeals={setMeals}
                selectedMealIdx={selectedMealIdx}
                setSelectedMealIdx={setSelectedMealIdx}
                selectedFoodObj={selectedFoodObj}
                setSelectedFoodObj={setSelectedFoodObj}
            />
        </>
    )
}

export default Diary;
