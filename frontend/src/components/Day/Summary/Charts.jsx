import { useState, useEffect } from "react";
import { diaryGroups } from "../../../constants";
import { titleCase, roundTo} from "../../../lib/functions";
import DoughnutChart from "../../DoughnutChart";

const Charts = ({dailyTargets, meals, selectedMealIdx, selectedFoodObj}) => {
    // Arr: Each meal cost individually.
    const mealsCostsArr = meals.map(meal => roundTo(meal.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 2));
    // Number: total momeny spent.
    const totalMoneySpent = roundTo(mealsCostsArr.reduce((acc, m) => acc + m, 0), 2);
    const budgetRemainning = roundTo(dailyTargets.budget - totalMoneySpent, 2);

    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    const isWithinBudget = budgetRemainning >= 0;

    const mealLabels = meals.map(m => titleCase(m.name));

    return (
        <>
        {/* Dougnut charts */}
        <h5 className="fw-bold">Budget</h5>
        <div className="row">
            {/* Spent Budget */}
            {(() => {
                const meal = meals[selectedMealIdx];
                const mealSelected = selectedMealIdx != null;
                const labels = mealSelected? meal.foods.map(f => f.foodData.productName): mealLabels;
                const mealsOrMealCosts = mealSelected? meal.foods.map(f => f.diaryData.totalCost): mealsCostsArr;
                const moneySpent = mealSelected? meal.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0): totalMoneySpent;

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
            <div className="col-sm-6" style={{opacity: selectedMealIdx || selectedFoodObj? 0.5: 1, pointerEvents: selectedMealIdx || selectedFoodObj? 'none': 'auto'}}>
                <DoughnutChart
                    labels={['Remainning', ...mealLabels]}
                    datasetLabel={'amount'}
                    emptyDatasetLabel={'amount'}
                    data={[isWithinBudget? budgetRemainning: 0, ...mealsCostsArr]}
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
