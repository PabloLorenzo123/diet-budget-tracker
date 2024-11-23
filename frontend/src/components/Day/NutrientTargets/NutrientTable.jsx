import { useState, useEffect, Fragment } from "react";
import { nutrientsTable } from "../../../lib/nutrients";
import {getTotalNutrients, titleCase} from "../../../lib/functions";

import '../../../styles/nutrientTableForm.css';


const NutrientTable = ({category, dailyTargets, mealsArr, selectedMeal, selectedFoodObj}) => {
    return (
        <div className="table-wrapper">
            <table className="table nutrient-table">
                <colgroup>
                    <col style={{width: '40%'}}/>
                    <col style={{width: '20%'}}/>
                    <col style={{width: '30%'}}/>
                    <col style={{width: '10%'}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>{titleCase(category)}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {nutrientsTable[category].map(nutrient => {
                        return (
                            <Fragment key={nutrient.name}>
                                {(() => {
                                    const [totalNutrients, totalNutrientsPercentage] = getTotalNutrients(nutrient.name, mealsArr, dailyTargets, selectedMeal, selectedFoodObj);
                                    return (
                                        <tr key={nutrient.name}>
                                            <td>{nutrient.altName}</td>
                                            <td><p className="text-end m-0 p-0">{totalNutrients}{nutrient.unit}</p></td>
                                            <td>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="progress" style={{width: '100px'}} role="progressbar" aria-label="Basic example" aria-valuenow={totalNutrientsPercentage} aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar" style={{width: `${totalNutrientsPercentage}%`}}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-end m-0 p-0">{totalNutrientsPercentage}%</p>
                                            </td>
                                        </tr>
                                        )
                                    })()}
                            </Fragment>
                        )
                        
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default NutrientTable;
