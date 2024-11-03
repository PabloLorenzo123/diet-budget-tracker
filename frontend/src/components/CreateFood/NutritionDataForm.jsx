import { useState, useEffect } from "react";
import { nutrients } from "../../lib/nutrients.js";
import {
  titleCase,
  removeTrailingZeros,
  roundTo,
  validateDecimalNumberInput
} from "../../lib/functions.js";

import ManualOrSearchFood from "./ManualOrSearchFood.jsx";

const NutritionDataForm = ({
  foodData,
  setFoodData,
  nutritionData,
  setNutritionData
}) => {
  const handleChange = (dv, e) => {
    const { name, value } = e.target;
    setNutritionData((prev) => ({
      ...prev,
      [name]: {
        amount: value || 0,
        dv: roundTo((value / dv) * 100, 2)
      }
    }));
  };

  const updateDv = (nutrient, dv, e) => {
    const percentage = e.target.value / 100;
    const newAmount = dv * percentage || 0;
    setNutritionData((prev) => ({
      ...prev,
      [nutrient]: {
        amount: newAmount,
        dv: roundTo(percentage * 100, 2)
      }
    }));
  };

  const gramWeightInput = () => {
    return (
      <input
        type="text"
        inputMode="decimal" // Enables numeric keypad on mobile
        placeholder="n/a"
        onChange={handleChange}
        onInput={validateDecimalNumberInput}
        className="form-control"
        name="gramWeight"
        value={foodData.gramWeight}
      />
    );
  };

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
          {Object.keys(nutrients).map((category) => {
            return (
              <table className="nutrient-table table" key={`${category}-table`}>
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>{titleCase(category)}</th>
                    <th>Amount</th>
                    <th>% DV</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(nutrients[category]).map((nutrient) => {
                    return (
                      <tr key={`${nutrient}-tr`}>
                        <td>{titleCase(nutrient)}</td>
                        <td>
                          <input
                            type="text"
                            inputMode="decimal" // Enables numeric keypad on mobile
                            className="nutrient-input"
                            value={nutritionData[nutrient].amount}
                            name={nutrient}
                            onChange={(e) =>
                              handleChange(nutrients[category][nutrient]?.dv, e)
                            }
                            onInput={validateDecimalNumberInput}
                          />
                          {nutrients[category][nutrient]?.unit}
                        </td>
                        <td>
                          {nutrients[category][nutrient]?.dv != null ? (
                            <>
                              <input
                                type="text"
                                inputMode="decimal" // Enables numeric keypad on mobile
                                className="nutrient-input"
                                value={nutritionData[nutrient].dv}
                                onChange={(e) =>
                                  updateDv(
                                    nutrient,
                                    nutrients[category][nutrient]?.dv,
                                    e
                                  )
                                }
                                onInput={validateDecimalNumberInput}
                              />
                              <span>%</span>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NutritionDataForm;
