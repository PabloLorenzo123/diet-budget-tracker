import { useState, useEffect } from "react";
import { nutrientsTable } from "../../../lib/nutrients.js";
import {validateDecimalNumberInput} from "../../../lib/functions.js";

import ManualOrSearchFood from "./ManualOrSearchFood.jsx";
import NutrientsTable from "../../NutrientsTable.jsx";

const NutritionDataForm = ({foodData, setFoodData, nutritionData, setNutritionData, handleChange}) => {
  
  return (
    <>
      <div className="create-food-form">
        <ManualOrSearchFood
        foodData={foodData}
        setFoodData={setFoodData}
        nutritionData={nutritionData}
        setNutritionData={setNutritionData}
        />
        <div className="nutrient-data mb-2">
          <p className="fw-bold h5">Nutrition Overview</p>
          <p className="text-muted">
            Percent daily values (DV%) are based on a 2,000 calorie diet. Your
            daily values may be higher or lower depending on your targets.
          </p>
          <div className="d-flex align-items-center">
            <h6>
            Nutrients in <span className="fw-bold">one {foodData.measure}</span>
            </h6>
              {
                <input
                type="text"
                inputMode="decimal" // Enables numeric keypad on mobile
                placeholder="n/a"
                onChange={e => setFoodData(prev => ({...prev, gramWeight: e.target.value}))}
                onInput={validateDecimalNumberInput}
                className="form-control ms-2"
                name="gramWeight"
                value={foodData.gramWeight}
                style={{width: '100px'}}
                />
              }
            <span>g</span>    
          </div>
        </div>

        <div className="nutrient-tables-container">
          <NutrientsTable
            nutritionData={nutritionData}
            setNutritionData={setNutritionData}
          />
        </div>
      </div>
    </>
    );
  };

export default NutritionDataForm;
