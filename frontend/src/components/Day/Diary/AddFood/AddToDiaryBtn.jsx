import { useState, useEffect } from "react";
import { roundTo, calculateNutritionalContribution, foodTotalCost } from "../../../../lib/functions";

const AddToDiaryBtn = ({meals, setMeals, currentDay, groceries, setGroceries,
    showModal, setShowModal, selectedFood, setSelectedFood, addToDiaryForm, setAddToDiaryForm}) => {
    
    const addToDiary = async () => {
        const mealIdx = addToDiaryForm.diaryGroup; // The meal this food product will be added to.
        
        const groceriesIdx = groceries[selectedFood.id]?.foods.length > 0 ? 
        groceries[selectedFood.id].foods.length: 0;

        const servings = parseFloat(addToDiaryForm.servings);
        const servingMeasure = addToDiaryForm.servingMeasure; // {unit, valueInGrams}.
        const portionSize = servings * servingMeasure.valueInGrams || undefined; // Undefined in case this food product doesnt have a serving size.

        const totalCost = foodTotalCost(selectedFood, addToDiaryForm.servingMeasure.valueInGrams, servings);

        const nutritionalContribution = calculateNutritionalContribution(selectedFood, portionSize);

        // Add this food to the foods array of the corresponding meal.
        const food = {
            ...selectedFood,
            nutritionalContribution,
            diaryData: {
                servings,
                servingMeasure,
                portionSize,
                totalCost,
                mealIdx, // Used to update and access the food in the Diary.
                groceriesIdx // Used to update and access the food in the groceries state.
            }
        }
        
        // Add this food to the diary.
        await setMeals(prev => {
            // Create a new array with updated objects
            return prev.map((day, idx) => {
                if (idx == currentDay){
                    // Then update the foods list of the selected meal.
                    const newArray = day.map((m, idx) => {
                        if (idx == mealIdx){
                            return {...m, foods: [...m.foods, food], show: true};
                        }
                        return m
                    });
                    return newArray;
                }
                return day;
            })
        })

        // Add this food obj to the groceries.
        await setGroceries(prev => {
            return {
                ...prev,
                [food.id]: {
                    foodData: selectedFood.foodData,
                    foods: prev[food.id] ? [...prev[food.id].foods, food] : [food]
                }
            }
        })
        setShowModal(false);
    }

    return (
        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={addToDiary}>
            Add To Diary
            </button>
        </div>
    )
}

export default AddToDiaryBtn;
