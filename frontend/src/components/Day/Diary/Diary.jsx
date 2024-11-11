import { useState, useEffect } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import MealsTable from "./MealsTable/MealsTable";

const Diary = ({meals, setMeals, selectedMeal, setSelectedMeal, selectedFoodObj, setSelectedFoodObj}) => {

    return (
        <>
            <AddFoodBtn
                meals={meals}
                setMeals={setMeals}
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
