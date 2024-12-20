import { useState, useEffect } from "react";

import { nutrientsTable } from "../../../../../lib/nutrients";
import { roundTo, splitArray } from "../../../../../lib/functions";

const FoodDetailsTargets = ({meals, dailyTargets, selectedFood, addToDiaryForm}) => {
    
    const getTotalNutrients = (nutrient) => {
        const nutrientPerGram = selectedFood.nutritionData[nutrient] / selectedFood.foodData.gramWeight;
        const totalNutrients = roundTo(nutrientPerGram * addToDiaryForm.servingMeasure.valueInGrams * addToDiaryForm.servings, 2);
        const percentage = roundTo(totalNutrients / dailyTargets[nutrient].amount * 100, 2) || 0;
        return [totalNutrients, percentage];
    }

    const getTotalSpent = () => {
        const pricePerGram = selectedFood.foodData.productPrice / (selectedFood.foodData.gramWeight * selectedFood.foodData.servings);
        const totalSpent = roundTo(pricePerGram * (addToDiaryForm.servingMeasure.valueInGrams * addToDiaryForm.servings), 2);
        const percentage = roundTo(totalSpent / dailyTargets.budget * 100, 2);
        return [totalSpent, percentage];
    }

    return (
        <>
            <div className="row align-items-end">
                <div className="col-sm-6">
                    <span className="fw-bold">Budget</span>
                </div>
                {/* Budget progress bar */}
                <div className="col-sm-6">
                    {(() => {
                        const [moneySpent, moneySpentPercentage] = getTotalSpent();
                        return (
                            <>
                            {/* Progress bar details on top of the bar */}
                            <div className="d-flex flex-wrap justify-content-between">
                                <span>${moneySpent} / ${dailyTargets.budget}</span>
                                <span>{moneySpentPercentage || 0}%</span>
                            </div>
                            {/* Progress bar */}
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={moneySpentPercentage} aria-valuemin="0" aria-valuemax="100" style={{height: '15px'}}>
                                <div
                                    className="progress-bar"
                                    style={{width: `${moneySpentPercentage? moneySpentPercentage: '100'}%`}}
                                ></div>
                            </div>
                            </>
                        )
                    })()}
                </div>
            </div>
            {/* Macronutrients progress bars */}
            {nutrientsTable.general.map(macronutrient => {
                return (
                    <div className="row align-items-end" key={macronutrient.name}>
                        <div className="col-sm-6">
                            <span className="fw-bold">{macronutrient.altName}</span>
                        </div>
                        {/* Progress bar */}
                        <div className="col-sm-6">
                            {(() => {
                                const [totalNutrients, totalNutrientsPercentage] = getTotalNutrients(macronutrient.name);
                                return (
                                    <>
                                    {/* Progress bar details on top of the bar */}
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <span>{totalNutrients}{macronutrient.unit} / {dailyTargets[macronutrient.name].amount}{macronutrient.unit}</span>
                                        <span>{totalNutrientsPercentage || 0}%</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={totalNutrientsPercentage} aria-valuemin="0" aria-valuemax="100" style={{height: '15px'}}>
                                        <div
                                            className="progress-bar"
                                            style={{width: `${totalNutrientsPercentage? totalNutrientsPercentage: '100'}%`}}
                                        ></div>
                                    </div>
                                    </>
                                )
                            })()}
                        </div>
                    </div>

                )
            })}
        </>
    )
}

export default FoodDetailsTargets;
