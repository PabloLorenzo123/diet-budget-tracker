import { useState, useEffect } from "react";
import { titleCase, roundTo, validateDecimalNumberInput } from "../../../../lib/functions";
import { massUnits } from "../../../../constants";

const FoodsSubTable = ({meals, setMeals, currentDay, groceries, setGroceries,
     selectedFoodObj, setSelectedFoodObj, mealObj, isMealSelected, handleOnClickFood}) => {

    const addUpdateFoodToGroceries = (updatedFood, del = false) => {
        const productId = updatedFood.id
        setGroceries(prev => {
            return {
                ...prev,
                [productId]: {
                    ...groceries[productId],
                    // Update the food object corresponding to this one in the foods array.
                    foods: [
                        // This is quicker than a map(el => el.index == desiredIndex then updating).
                        ...groceries[productId].foods.slice(0, updatedFood.diaryData.groceriesIdx),
                        del? undefined: updatedFood,
                        ...groceries[productId].foods.slice(updatedFood.diaryData.groceriesIdx +1)
                    ]
                }
            }
        })
    }

    const changeFoodServings = async (e, idx, food) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value)){
            return;
        }
        // console.log(meals);
        const mealObj = meals[currentDay][food.diaryData.mealIdx];
        // console.log(mealObj);
        const mealIdx = food.diaryData.mealIdx;

        let updatedFoods = mealObj.foods;
        let updatedFood = {...food};

        // Need to update servings, portion size and total cost accordingly.
        let updatedFoodDiaryData = updatedFood.diaryData;
        updatedFoodDiaryData.servings = value;
        updatedFoodDiaryData.portionSize = value * food.diaryData.servingMeasure.valueInGrams;
        updatedFoodDiaryData.totalCost = roundTo(
            updatedFoodDiaryData.portionSize * (food.foodData.productPrice / food.foodData.servings) / food.foodData.gramWeight, 2
        ); // Cost should be accounted by portion size and not by amount of servings.

        // Need to update the nutritional contribution because the amount of servings changed.
        let updatedFoodNutritionalContribution = food.nutritionalContribution;
        const [prevGramWeight, newGramWeight] = [food.foodData.gramWeight, updatedFood.diaryData.portionSize];
        Object.keys(updatedFoodNutritionalContribution).forEach(nutrient => {
            updatedFoodNutritionalContribution[nutrient] = roundTo(newGramWeight * food.nutritionData[nutrient] / prevGramWeight, 2);
        })

        updatedFoods[idx] = updatedFood;

        // Update meals.
        setMeals(prev => {
            return prev.map((day, dayIdx) => {
                if (dayIdx == currentDay) {
                    const newArray = day.map((m, idx) => {
                        if (idx == mealIdx){
                            return ({...m, foods: updatedFoods})
                        }
                        return m;
                    })
                    return newArray;
                }
                return day;
            });
        })
        // Update in groceries.
        addUpdateFoodToGroceries(updatedFood);

        setSelectedFoodObj(updatedFood);
       // Food wont unselect because the food state only updates when onBlur and not when onChange.
    }

    const changeFoodServingMeasure = (e, sms, food, idx) => {
        const value = e.target.value;
        const sm = sms.find(item => item.unit == value);
        // Because the serving measure changed, the portion size too and so did the cost and nutritional contributions.

        const mealObj = meals[currentDay][food.diaryData.mealIdx]
        const mealIdx = food.diaryData.mealIdx;

        let updatedFoods = mealObj.foods;
        let updatedFood = {...food};

        let updatedFoodDiary = updatedFood.diaryData;
        updatedFoodDiary.servingMeasure = sm;
        updatedFoodDiary.portionSize = food.diaryData.servings * sm.valueInGrams;
        updatedFoodDiary.totalCost = roundTo(
            updatedFoodDiary.portionSize * (food.foodData.productPrice / food.foodData.servings) / food.foodData.gramWeight, 2
        ); // Cost should be accounted by portion size and not by amount of servings.
        
        // Need to update the nutritional contribution because the amount of servings changed.
        let updatedFoodNutritionalContribution = food.nutritionalContribution;
        const [prevGramWeight, newGramWeight] = [food.foodData.gramWeight, updatedFood.diaryData.portionSize];
        Object.keys(updatedFoodNutritionalContribution).forEach(nutrient => {
            updatedFoodNutritionalContribution[nutrient] = roundTo(newGramWeight * food.nutritionData[nutrient] / prevGramWeight, 2);
        })
        updatedFoods[idx] = updatedFood;
        setMeals(prev => {
            return prev.map((day, dayIdx) => {
                if (dayIdx == currentDay) {
                    const newArray = day.map((m, idx) => {
                        if (idx == mealIdx) return ({...m, foods: updatedFoods})
                        return m;
                    })
                    return newArray;
                }
                return day;
            })
        })
        // Update in groceries.
        addUpdateFoodToGroceries(updatedFood);

        setSelectedFoodObj(updatedFood);
    }

    const removeFood = (food, idx) => {
        const mealObj = meals[currentDay][food.diaryData.mealIdx]
        const mealIdx = food.diaryData.mealIdx;

        const updatedFoods = [...mealObj.foods];
        updatedFoods.splice(idx, 1);

        setMeals(prev => {
            return prev.map((day, dayIdx) => {
                if (dayIdx == currentDay){
                    const newArray = day.map((m, idx) => {
                        if (idx == mealIdx) return {...m, foods: updatedFoods}
                        return m
                    })
                    return newArray;
                }
                return day;
            })
        })

         // Update in groceries.
         addUpdateFoodToGroceries(selectedFoodObj, true);
    }

    return (
        <>
        {mealObj.foods.length > 0 &&
            <>
            {(() => {

                return (
                    
                    <tr style={{display: mealObj.show? 'table-row': 'none'}} className={`tr-food ${isMealSelected}`}>
                        <td colSpan="3">
                            <table className="table-food">
                                <tbody>
                                    {mealObj.foods.map((f, idx) => {
                                        return (
                                            <tr
                                                key={`${f.id}-${idx}`}
                                                className={selectedFoodObj == f? 'selected': ''}
                                                onClick={() => handleOnClickFood(f)}
                                            >
                                                <td>{f.foodData.productName}</td>
                                                {/* Servings */}
                                                <td>
                                                    {selectedFoodObj == f?
                                                        <input
                                                            type="text"
                                                            keypad="decimal"
                                                            className="form-control"
                                                            style={{width: '60px'}}
                                                            inputMode="decimal" // Enables numeric keypad on mobile
                                                            name="servings"
                                                            defaultValue={f.diaryData.servings}
                                                            onClick={e => e.stopPropagation()}
                                                            onInput={validateDecimalNumberInput}
                                                            onBlur={e => changeFoodServings(e, idx, f)}
                                                        />
                                                        :
                                                        `${f.diaryData.servings}`
                                                    }
                                                </td>
                                                {/* Serving measure */}
                                                <td>
                                                    {selectedFoodObj == f?
                                                        <>
                                                        {(() => {
                                                            const sms = [...massUnits, {
                                                                unit: f.foodData.measure,
                                                                valueInGrams: f.foodData.gramWeight
                                                            }]; // Serving measures.
                                                            return (
                                                                <select
                                                                    className="form-control"
                                                                    onClick={e => e.stopPropagation()}
                                                                    onChange={e => changeFoodServingMeasure(e, sms, f, idx)}
                                                                    value={f.diaryData.servingMeasure.unit}
                                                                >
                                                                    {sms.map(sm => {
                                                                        return (
                                                                            <option key={sm.unit} value={sm.unit}>
                                                                                {sm.unit}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            )
                                                        })()}                                                     
                                                        </>
                                                        :
                                                        // Display measure name and add and 's' if neccesary.
                                                        `${f.diaryData.servingMeasure.unit}${f.diaryData.servings > 1 
                                                            && !massUnits.includes(f.diaryData.servingMeasure)? 's': ''}`
                                                    }
                                                </td>
                                                <td>{f.nutritionalContribution.energy}kcal</td>
                                                <td>{f.nutritionalContribution.protein}g</td>
                                                <td>{f.nutritionalContribution.netCarbs}g</td>
                                                <td>{f.nutritionalContribution.totalFat}g</td>
                                                <td>${roundTo(f.diaryData.totalCost, 2)}</td>
                                                {/* Remove button */}
                                                <td>
                                                    {selectedFoodObj == f?
                                                        <button
                                                        className="d-flex align-items-center bg-transparent border-0 p-0 m-0 me-2"
                                                        onClick={() => removeFood(f, idx)}
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                close
                                                            </span>
                                                        </button>
                                                        :
                                                            ''
                                                        
                                                    }
                                                </td>
                                                
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                );
            })()}
            </>
        }
        </>
    )
}

export default FoodsSubTable;
