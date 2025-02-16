import { useState, useEffect, Fragment } from "react";
import { titleCase, roundTo, getTotalNutrientsInMeal } from "../../../../lib/functions";

import "../../../../styles/diary/mealsTable.css";
import FoodsSubTable from "./FoodsSubTable";

const MealsTable = ({meals, setMeals, currentDay, groceries, setGroceries, selectedMealIdx,
    setSelectedMealIdx, selectedFoodObj, setSelectedFoodObj}) => {

    

    const setShow = (e, mealIdx) => {
        // Toggles the show property of a meal.
        e.stopPropagation(); // To avoid evocating handleOnClickMeal().
        setMeals(prev => {
            return prev.map((day, dayIdx) => {
                if (dayIdx == currentDay) {
                    // Create a new array with updated objects
                    const newArray = day.map((meal, idx) => {
                        if (idx === mealIdx) {
                            return { ...meal, show: !meal.show }; // Create a new object for the updated meal
                        }
                        return meal;
                    });
                    return newArray;
                }
                return day;
            });
        });
    }

    const handleOnClickMeal = (mealIdx) => {
        if (selectedMealIdx != mealIdx) {
            setSelectedMealIdx(mealIdx);
        } else {
            // Unselect.
            setSelectedMealIdx(null);
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
        if (selectedMealIdx != null) setSelectedMealIdx(null);
        //console.log(food);
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
                        {meals[currentDay].map((meal, idx) => {
                            if (!meal) return;
                            if (meal.hideFromDiary) return;

                            const mealName = meal.name;
                            const isMealSelectedClass = selectedMealIdx == idx && !selectedFoodObj? ' selected': '';
                            const mealObj = meal;
                            // Totals.
                            const totalEnergy = getTotalNutrientsInMeal(mealObj.foods, 'energy');
                            const totalProtein = getTotalNutrientsInMeal(mealObj.foods, 'protein');
                            const totalNetCarbs = getTotalNutrientsInMeal(mealObj.foods, 'netCarbs');
                            const totalFat = getTotalNutrientsInMeal(mealObj.foods, 'totalFat');
                            const totalCost = roundTo(mealObj.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 2);

                            return (
                            <Fragment key={idx}>
                                {/* Tr meal, meal name and summary */}
                                <tr className={`tr-meal ${isMealSelectedClass}`} onClick={() => handleOnClickMeal(idx)}>
                                    <td className="td-meal">{titleCase(mealName)}</td>
                                    <td className="td-diary-data">
                                        {mealObj.foods.length > 0 && 
                                            <>
                                                <span>{totalEnergy} kcal - </span>
                                                <span>{totalProtein} g protein - </span>
                                                <span>{totalNetCarbs} g carbs - </span>
                                                <span>{totalFat} g fat - </span>
                                                <span>${totalCost}</span>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <button className="meal-toggle-btn" onClick={(e) => setShow(e, idx)}>
                                                {mealObj.show?
                                                <span className="material-symbols-outlined">
                                                    stat_1
                                                </span>:
                                                <span className="material-symbols-outlined">
                                                    stat_minus_1
                                                </span>
                                                }
                                            </button>
                                        </div>    
                                    </td>
                                </tr>
                                
                                {/* Foods in the meal */}
                                <FoodsSubTable
                                    meals={meals}
                                    setMeals={setMeals}
                                    currentDay={currentDay}
                                    groceries={groceries}
                                    setGroceries={setGroceries}
                                    mealObj={mealObj}
                                    selectedFoodObj={selectedFoodObj}
                                    setSelectedFoodObj={setSelectedFoodObj}
                                    isMealSelected={isMealSelectedClass}
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
