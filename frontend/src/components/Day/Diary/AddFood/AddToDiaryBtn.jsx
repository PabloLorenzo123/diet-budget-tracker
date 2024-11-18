import { useState, useEffect } from "react";
import { roundTo } from "../../../../lib/functions";

const AddToDiaryBtn = ({meals, setMeals, showModal, setShowModal, selectedFood, setSelectedFood, addToDiaryForm, setAddToDiaryForm}) => {
    
    const addToDiary = async () => {
        const mealIdx = addToDiaryForm.diaryGroup;
        const mealName = meals[mealIdx].name;
        const servings = parseFloat(addToDiaryForm.servings);
        const servingMeasure = addToDiaryForm.servingMeasure;
        const portionSize = servings * servingMeasure.valueInGrams;
        const totalCost = roundTo((selectedFood.foodData.productPrice / selectedFood.foodData.servings) * servings, 2);

        const nutritionalContribution = {...selectedFood.nutritionData};
        // Update the nutritional contribution data.
        Object.keys(nutritionalContribution).map(nutrient => {
            // console.log(portionSize, selectedFood.nutritionData[nutrient], selectedFood.foodData.servingSize);
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
                totalCost,
                mealIdx
            }
        }
        
        await setMeals(prev => {
            // Create a new array with updated objects
            const newArray = prev.map((m, idx) => {
                return idx == mealIdx?
                    {
                        ...m,
                        foods: [...m.foods, food],
                        show: true
                    }
                    : m
            });
            console.log(newArray);
            return newArray;
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
