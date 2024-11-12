import { useState, useEffect, Fragment } from "react";
import { titleCase, roundTo } from "../../../../lib/functions";

import "../../../../styles/diary/MealsTable.css";
import FoodsSubTable from "./FoodsSubTable";

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
        if (selectedMeal) setSelectedMeal('');
        console.log(food);
    }

    return (
        <>
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
                                <tr className={`tr-meal ${isMealSelected}`}
                                onClick={() => handleOnClickMeal(meal)}>
                                    <td className="td-meal">{titleCase(meal)}</td>
                                    <td className="td-diary-data">
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
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <button className="meal-toggle-btn" onClick={(e) => setShow(e, meal)}>
                                                {!mealObj.show?
                                                <span className="material-symbols-outlined">
                                                    stat_minus_1
                                                </span>:
                                                <span className="material-symbols-outlined">
                                                    stat_1
                                                </span>}
                                            </button>
                                        </div>    
                                    </td>
                                </tr>
                                
                                {/* Foods in the meal */}
                                <FoodsSubTable
                                    meals={meals}
                                    setMeals={setMeals}
                                    mealObj={mealObj}
                                    selectedFoodObj={selectedFoodObj}
                                    setSelectedFoodObj={setSelectedFoodObj}
                                    isMealSelected={isMealSelected}
                                    handleOnClickFood={handleOnClickFood}
                                />
                            </Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MealsTable;
