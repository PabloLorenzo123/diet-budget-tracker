import { useState, useEffect, Fragment } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import { titleCase, roundTo } from "../../../lib/functions";

import "../../../styles/dairy/MealsTable.css";

const MealsTable = ({meals, setMeals, selectedMeal, setSelectedMeal, selectedFoodObj, setSelectedFoodObj}) => {

    const getTotalNutrientsInMeal = (foods, nutrient) => roundTo(foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 2);

    const setShow = (e, meal) => {
        e.stopPropagation(); // To avoid evocating handleOnClickMeal().
        setMeals(prev => ({
            ...prev,
            [meal]: {
                ...meals[meal],
                show: !meals[meal].show,
            }
        }))
    }

    const handleOnClickMeal = (meal) => {
        if (selectedMeal != meal) {
            setSelectedMeal(meal);
        } else {
            // Unselect.
            setSelectedMeal('');
        }
        setSelectedFoodObj(null);
    }

    const handleOnClickFood = (food) => {
        if (selectedFoodObj != food) {
            setSelectedFoodObj(food);
        } else {
            // Unselect.
            setSelectedFoodObj(null);
        }
        setSelectedMeal('');
    }

    const handleFoodChange = (e, food) => {
        const {name, value} = e.target.value;
        setMeals(prev => ({
            ...prev,
            
        }))
    }

    return (
        <>
            <AddFoodBtn meals={meals} setMeals={setMeals}/>
            <div className="day-meals">
                <table className="table-meals">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(meals).map((meal, index) => {
                            const isMealSelected = selectedMeal == meal && !selectedFoodObj? ' selected': '';
                            const mealObj = meals[meal];

                            return (
                            <Fragment key={meal}>
                                {/* Tr meal, meal name and summary */}
                                <tr className={`tr-meal${index + 1 == meals.length? ' last': ''}${isMealSelected}`}
                                onClick={() => handleOnClickMeal(meal)}>
                                    <td className="td-meal">{titleCase(meal)}</td>
                                    <td className="td-dairy-data">
                                        {meals[meal].foods.length > 0 && 
                                        <>
                                            <span>{getTotalNutrientsInMeal(mealObj.foods, 'energy')} kcal - </span>
                                            <span>{getTotalNutrientsInMeal(mealObj.foods, 'protein')} g protein - </span>
                                            <span>{getTotalNutrientsInMeal(mealObj.foods, 'netCarbs')} g carbs - </span>
                                            <span>{getTotalNutrientsInMeal(mealObj.foods, 'totalFat')} g fat - </span>
                                            <span>${mealObj.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0)}</span>
                                        </>
                                        }
                                    </td>
                                    <td className="d-flex justify-content-end">
                                        <button className="meal-toggle-btn" onClick={(e) => setShow(e, meal)}>
                                            {!mealObj.show?
                                            <span className="material-symbols-outlined">
                                                stat_minus_1
                                            </span>:
                                            <span className="material-symbols-outlined">
                                                stat_1
                                            </span>}
                                        </button>
                                    </td>
                                </tr>
                                
                                {/* Foods in the meal */}
                                {mealObj.foods.length > 0 &&
                                <tr style={{display: mealObj.show? 'table-row': 'none'}} className={`tr-food ${isMealSelected}`}>
                                    <td colSpan="3">
                                        <table className="table-food">
                                            <tbody>
                                                {meals[meal].foods.map((f, idx) => {
                                                    return (
                                                        <tr key={`${f.id}-${idx}`}
                                                        className={selectedFoodObj == f? 'selected': ''}
                                                        onClick={() => handleOnClickFood(f)}>
                                                            <td>{f.foodData.productName}</td>
                                                            <td>
                                                                {selectedFoodObj == f?
                                                                    <input
                                                                    type="text"
                                                                    keypad="decimal"
                                                                    className="form-control"
                                                                    inputMode="decimal" // Enables numeric keypad on mobile
                                                                    style={{width: '50px'}}
                                                                    name="servings"
                                                                    value={f.diaryData.servings}
                                                                    onChange={e => handleFoodChange(e, f)}
                                                                    />:
                                                                    `${f.diaryData.servings}`
                                                                }
                                                            </td>
                                                            <td>{f.diaryData.servingMeasure.unit}{f.diaryData.servings > 1? 's': ''}</td>
                                                            <td>{f.nutritionalContribution.energy}kcal</td>
                                                            <td>{f.nutritionalContribution.protein}g</td>
                                                            <td>{f.nutritionalContribution.netCarbs}g</td>
                                                            <td>{f.nutritionalContribution.totalFat}g</td>
                                                            <td>${f.diaryData.totalCost}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                }
                            </Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MealsTable;
