import { useState, useEffect } from "react";
import {nutrientsTable} from "../../../lib/nutrients";

import {roundTo} from "../../../lib/functions";
import Charts from "./Charts";



const FoodSummary = ({meals, dailyTargets, selectedMeal, selectedFoodObj}) => {
    
    const getTotalNutrients = (nutrient) => {
        let totalNutrients;
        if (selectedMeal){
            // Sum all the nutrients of the foods in this meal.
            totalNutrients = meals[selectedMeal].foods.reduce((acc, meal) => acc + meal.nutritionalContribution[nutrient], 0);
        } 
        else if (selectedFoodObj) {
            totalNutrients = selectedFoodObj.nutritionalContribution[nutrient];
        } else {
            // Sum all the nutrients of all the foods in the dairy.
            totalNutrients = Object.keys(meals).reduce((acc, meal) => {
                return acc + meals[meal].foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0)
            }, 0)
        }
        return roundTo(totalNutrients, 2);
    }

    const getTotalNutrientsPercentage = (nutrient) => {
        return roundTo(getTotalNutrients(nutrient) / dailyTargets[nutrient].amount * 100, 2);
    }

    return (
        <>
        <div className="progress-bars row">
            <div className="col-sm-6 border-end">
                <Charts
                    dailyTargets={dailyTargets}
                    meals={meals}
                    selectedMeal={selectedMeal}
                    selectedFoodObj={selectedFoodObj}
                />
            </div>
            {/* Macronutrient goals and progress bars. */}
            <div className="col-sm-6">
                <h5 className="fw-bold">Targets</h5>
                {nutrientsTable.general.map(macronutrient => {
                    return (
                        <div className="row d-flex align-items-end mb-sm-2 mb-5" key={macronutrient.altName} style={{height: '40px'}}>
                            <div className="col-12 col-sm-6 ">
                                <p className="fw-bold m-0">{macronutrient.altName}</p>
                            </div>
                            {/* Progress bar */}
                            <div className="col-12 col-sm-6 ">
                                {(() => {
                                    const totalNutrients = getTotalNutrients(macronutrient.name);
                                    const totalNutrientsPercentage = getTotalNutrientsPercentage(macronutrient.name);
                                    return (
                                        <>
                                            {/* Progress bar details on top of the bar */}
                                            <div className="d-flex flex-wrap justify-content-between">
                                                <span>{totalNutrients}{macronutrient.unit} / {dailyTargets[macronutrient.name].amount}{macronutrient.unit}</span>
                                                <span>{totalNutrientsPercentage}%</span>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={totalNutrientsPercentage} aria-valuemin="0" aria-valuemax="100" style={{height: '15px'}}>
                                                <div className="progress-bar" style={{width: `${totalNutrientsPercentage}%`}}></div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default FoodSummary;