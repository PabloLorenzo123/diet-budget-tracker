import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";

const Diary = ({meals, dailyTargets, setMeals, selectedMeal, setSelectedMeal, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <AddFoodBtn
                meals={meals}
                setMeals={setMeals}
                dailyTargets={dailyTargets}
            />
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
