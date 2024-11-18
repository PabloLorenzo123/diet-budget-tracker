import { useState, useEffect, Fragment } from "react";

import NutrientTable from "./NutrientTable";
import { nutrientsTable } from "../../../lib/nutrients";
import { splitArray } from "../../../lib/functions";

const NutrientTargets = ({dailyTargets, meals, selectedMealIdx, selectedFoodObj}) => {
    
    const [leftColumnCategories, rightColumnCategories] = splitArray(Object.keys(nutrientsTable));

    const renderTables = (arr) => {
        return arr.map(category => {
            return (
                <Fragment key={category}>
                    <NutrientTable
                        category={category}
                        dailyTargets={dailyTargets}
                        meals={meals}
                        selectedMeal={selectedMealIdx}
                        selectedFoodObj={selectedFoodObj}
                    />
                </ Fragment>
            )
        })
    }

    return (
        <div>
            <h5 className="fw-bold mb-4">Nutrient Targets</h5>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {renderTables(leftColumnCategories)}
                    </div>

                    <div className="col">
                        {renderTables(rightColumnCategories)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NutrientTargets;
