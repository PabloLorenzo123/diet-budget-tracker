import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";
import MealsSettingsBtn from "./MealsTable/MealsSettings/MealsSettingsBtn";

const Diary = ({meals, setMeals, currentDay, groceries, setGroceries,
     dailyTargets, selectedMealIdx, setSelectedMealIdx, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <AddFoodBtn
                    meals={meals}
                    setMeals={setMeals}
                    currentDay={currentDay}
                    groceries={groceries}
                    setGroceries={setGroceries}
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
                groceries={groceries}
                setGroceries={setGroceries}
                selectedMealIdx={selectedMealIdx}
                setSelectedMealIdx={setSelectedMealIdx}
                selectedFoodObj={selectedFoodObj}
                setSelectedFoodObj={setSelectedFoodObj}
            />
        </>
    )
}

export default Diary;
