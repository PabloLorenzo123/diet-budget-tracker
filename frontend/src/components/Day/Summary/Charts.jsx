import { useState, useEffect } from "react";
import { diaryGroups } from "../../../constants";
import { titleCase } from "../../../lib/functions";
import DoughnutChart from "../../DoughnutChart";

const Charts = ({dailyTargets, meals, selectedMeal, selectedFoodObj}) => {
    const mealsCosts = Object.keys(meals).map(meal => meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0));
    const totalMoneySpent = Object.keys(meals).reduce((acc, meal) => acc + meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 0);
    const budgetRemainning = dailyTargets.budget - totalMoneySpent;

    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    const isWithinBudget = budgetRemainning >= 0;

    const mealLabels = diaryGroups.map(dg => titleCase(dg));

    const semiTransparentStyle = {opacity: selectedMeal? 0.5: 1, pointerEvents: selectedMeal? 'none': 'auto'};

    return (
        <>
        {/* Dougnut charts */}
        <h5 className="fw-bold">Budget</h5>
        <div className="row">
            {/* Spent Budget */}
            {(() => {
                const meal = meals[selectedMeal];
                const labels = selectedMeal? meal.foods.map(f => f.foodData.productName): mealLabels;
                const mealsOrMealCosts = selectedMeal? meal.foods.map(f => f.diaryData.totalCost): mealsCosts;
                const moneySpent = selectedMeal? meal.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0): totalMoneySpent;

                return (
                    <div className="col-sm-6" style={{opacity: selectedFoodObj? 0.5: 1, pointerEvents: selectedFoodObj? 'none': 'auto'}}>
                        <DoughnutChart
                            labels={labels}
                            datasetLabel={'amount'}
                            emptyDatasetLabel={'Spent'}
                            data={mealsOrMealCosts}
                            backgroundColor={backgroundColors}
                        />
                        <p className="text-center fw-bold mt-2">
                            <span style={{color: isWithinBudget? "": "red"}}>
                                ${moneySpent}
                            </span>
                                {' spent'}
                        </p>
                    </div>
                )
            })()}
            
            {/* Remainning Budget */}
            <div className="col-sm-6" style={{opacity: selectedMeal || selectedFoodObj? 0.5: 1, pointerEvents: selectedMeal || selectedFoodObj? 'none': 'auto'}}>
                <DoughnutChart
                    labels={['Remainning', ...mealLabels]}
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
        </>
    )
}

export default Charts;
