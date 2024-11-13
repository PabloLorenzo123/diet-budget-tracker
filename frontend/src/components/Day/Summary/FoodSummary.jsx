import { useState, useEffect } from "react";
import {nutrientsTable} from "../../../lib/nutrients";

import {getTotalNutrients} from "../../../lib/functions";
import Charts from "./Charts";




const FoodSummary = ({meals, dailyTargets, selectedMeal, selectedFoodObj}) => {

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
                        <div className="row align-items-end mb-sm-2 mb-5" key={macronutrient.altName} style={{height: '40px'}}>
                            <div className="col-12 col-sm-6 ">
                                <span className="fw-bold m-0">{macronutrient.altName}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="col-12 col-sm-6 ">
                                {(() => {
                                    const [totalNutrients, totalNutrientsPercentage] = getTotalNutrients(macronutrient.name, meals, dailyTargets, selectedMeal, selectedFoodObj);
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