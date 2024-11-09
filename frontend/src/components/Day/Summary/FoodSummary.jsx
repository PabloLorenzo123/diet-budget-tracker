import { useState, useEffect } from "react";
import {nutrientsTable} from "../../../lib/nutrients";

import {titleCase, roundTo} from "../../../lib/functions";
import { diaryGroups } from "../../../constants";
import DoughnutChart from "../../DoughnutChart";




const FoodSummary = ({meals, dailyTargets}) => {

    const moneySpent = Object.keys(meals).reduce((acc, meal) => acc + meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 0);
    const budgetRemainning = dailyTargets.budget - moneySpent;

    const mealsCosts = Object.keys(meals).map(meal => meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0));
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    const isWithinBudget = budgetRemainning >= 0;

    const labels = diaryGroups.map(dg => titleCase(dg));

    const getTotalNutrients = (nutrient) => {
        return roundTo(
            Object.keys(meals).reduce((acc, meal) => acc + meals[meal].foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 0),
            2);
    }

    const getTotalNutrientsPercentage = (nutrient) => {
        return roundTo(getTotalNutrients(nutrient) / dailyTargets[nutrient].amount * 100, 2);
    }

    return (
        <>
        <div className="progress-bars row">
            <div className="col-sm-6 border-end">
                <h5 className="fw-bold">Budget</h5>
                <div className="row">
                    {/* Spent Budget */}
                    <div className="col-sm-6">
                        <DoughnutChart
                            labels={labels}
                            datasetLabel={'amount'}
                            emptyDatasetLabel={'Spent'}
                            data={mealsCosts}
                            backgroundColor={backgroundColors}
                        />
                        <p className="text-center fw-bold mt-2">
                            <span style={{color: isWithinBudget? "": "red"}}>
                            ${moneySpent}
                            </span>
                            {' spent'}
                        </p>
                    </div>
                    {/* Remainning Budget */}
                    <div className="col-sm-6">
                        <DoughnutChart
                            labels={['Remainning', ...labels]}
                            datasetLabel={'amount'}
                            emptyDatasetLabel={'amount'}
                            data={[isWithinBudget? budgetRemainning: 0, ...mealsCosts]}
                            backgroundColor={['grey', ...backgroundColors]}
                        />
                        <p className="text-center fw-bold mt-2">
                            <span style={{color: isWithinBudget? "green": "red"}}>
                                ${isWithinBudget? budgetRemainning: budgetRemainning * -1}
                            </span>
                            {isWithinBudget? ' remainning': ' over budget'}
                        </p>
                    </div>
                </div>
                
            </div>
            {/* Macronutrient goals */}
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