import { useState, useEffect } from "react";
import {nutrientsTable} from "../../../lib/nutrients";
import {Chart as Chartjs, defaults} from "chart.js/auto";
import {Doughnut} from "react-chartjs-2";

import {titleCase} from "../../../lib/functions";
import { diaryGroups } from "../../../constants";
import DoughnutChart from "../../DoughnutChart";

defaults.maintainAspectRatio = false;
defaults.responsive = true;


const FoodSummary = ({meals, dailyTargets}) => {

    const fields = ['budget', 'energy', 'protein', 'netCarbs', 'totalFat'];

    return (
        <>
        <div className="progress-bars row">
            <div className="col-sm-6 border-end">
                <h5 className="fw-bold">Budget</h5>
                <div className="row">
                    {/* Spentbudget */}
                <div className="col-sm-6">
                    <DoughnutChart
                        labels={diaryGroups.map(dg => titleCase(dg))}
                        datasetLabel={'amount'}
                        emptyDatasetLabel={'Spent'}
                        data={Object.keys(meals).map(meal => meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0))}
                        backgroundColor={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']}
                    />
                    <p className="text-center fw-bold mt-2">Spent</p>
                </div>
                
                <div className="col-sm-6">
                    <div>
                        <Doughnut
                            data={{
                                labels: ['Remaining', ...diaryGroups.map(dg => titleCase(dg))],
                                datasets: [
                                    {
                                        label: 'amount',
                                        data: [
                                            dailyTargets.budget,
                                            ...Object.keys(meals).map(meal => meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0))
                                        ],
                                        backgroundColor : [
                                            'grey',
                                            '#FF6384', // soft red
                                            '#36A2EB', // sky blue
                                            '#FFCE56', // bright yellow
                                            '#4BC0C0', // teal green
                                            '#9966FF'  // lavender purple
                                        ],
                                        borderWidth: 0,
                                    }
                                ],
                                
                            }}

                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                        position: 'right' // Hide the legend
                                    }
                                }
                                
                            }}

                        />  
                    </div>
                    <p className="text-center fw-bold mt-2">Remainning</p>
                </div>
                </div>
                
            </div>
            {/* Macronutrient goals */}
            <div className="col-sm-6">
                <h5 className="fw-bold">Targets</h5>
                {nutrientsTable.general.map(macronutrient => {
                    return (
                        <div className="row d-flex align-items-end mb-2" key={macronutrient.altName} style={{height: '40px'}}>
                            <div className="col-sm-6">
                                <p className="fw-bold m-0">{macronutrient.altName}</p>
                            </div>
                            {/* Progress bar */}
                            <div className="col-sm-6">
                                {/* Progress bar details on top of the bar */}
                                <div className="d-flex justify-content-between">
                                    <span>25g/100</span>
                                    <span>25%</span>
                                </div>
                                {/* Progress bar */}
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '15px'}}>
                                    <div className="progress-bar" style={{width: '25%'}}></div>
                                </div>
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