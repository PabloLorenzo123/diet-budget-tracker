import { useState, useEffect } from "react";
import { roundTo } from "../../../lib/functions";

const AddToDiaryBtn = ({meals, setMeals, showModal, setShowModal, selectedFood, setSelectedFood, addToDiaryForm, setAddToDiaryForm}) => {
    const addToDiary = async () => {
        const meal = addToDiaryForm.diaryGroup;
        const servings = parseFloat(addToDiaryForm.servings);
        const servingMeasure = addToDiaryForm.servingMeasure;
        const portionSize = servings * servingMeasure.valueInGrams;
        const nutritionalContribution = {...selectedFood.nutritionData};
        const totalCost = roundTo((selectedFood.foodData.productPrice / selectedFood.foodData.servings) * servings, 2);
        
        // Update the nutrition data.
        Object.keys(nutritionalContribution).map(nutrient => {
            console.log(portionSize, selectedFood.nutritionData[nutrient], selectedFood.foodData.servingSize);
            nutritionalContribution[nutrient] = roundTo(portionSize * selectedFood.nutritionData[nutrient] / selectedFood.foodData.gramWeight, 2);
        })
        // Add this food to the foods array of the corresponding meal.
        const food = {
            ...selectedFood,
            nutritionalContribution,
            diaryData: {
                servings,
                servingMeasure,
                portionSize,
                totalCost
            }
        }
        
        await setMeals(prev => ({
            ...prev,
            [meal]: {
                ...meals[meal],
                foods: [...meals[meal].foods, food],
                show: true
            }
        }))
        
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
