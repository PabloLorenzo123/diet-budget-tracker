import { useState, useEffect } from "react";
import {nutrients} from '../../lib/nutrients.js';
import { titleCase, removeTrailingZeros } from "../../lib/functions.js";


const NutritionDataForm = ({nutritionData, setNutritionData}) => {
  const [isManual, setIsManual] = useState(false);


  const handleChange = (dv, e) => {
    const {name, value} = e.target;
    setNutritionData(prev => ({
      ...prev,
      [name]: {
        amount: value,
        dv: value / dv * 100
      }  
    }))
  }

  const updateDv = (nutrient, dv, e) => {
    const percentage = e.target.value / 100;
    const newAmount = dv * percentage;
    setNutritionData(prev => ({
        ...prev,
        [nutrient]: {
            amount: newAmount,
            dv: e.target.value
        }
    }))
  }

  return (
    <>
      <div className="create-food-form">
        <p className="fw-bold h4">Nutrition Info</p>
        <p className="form-text">Would you like to enter the nutritional information manually?</p>
        <div className="mb-3">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="isManual"
                    id="manualYes"
                    value="yes"
                    checked={isManual}
                    onChange={() => setIsManual(true)}
                />
                <label className="form-check-label" htmlFor="manualYes">
                    Yes
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="isManual"
                    id="manualNo"
                    value="no"
                    checked={!isManual}
                    onChange={() => setIsManual(false)}
                />
                <label className="form-check-label" htmlFor="manualNo">
                    No
                </label>
            </div>
        </div>

        <div className="row mt-2 mb-3">
            <div className="col-12 col-sm-7">
                <input type="text" disabled={isManual} className="form-control"
                placeholder="Search our sources for nutritional information about this food, what's this? ex: beef, sardines, eggs, etc."/>
            </div>
            <div className="col-12 col-sm-2">
                <button type="button" disabled={isManual} className="btn btn-secondary w-100">Search</button>
            </div>
        </div>

        <div className="nutrient-data mb-2">
            <p className="fw-bold h5">Nutrition Overview</p>
            <p className="text-muted">Percent daily values (DV%) are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your targets.</p>
            <div className="d-flex align-items-center">
                <label htmlFor="servingInput" className="me-2">Nutrients in: </label>
                <input type="number" id="servingInput" className="form-control me-4"  min="1" style={{width: '70px'}}/>
                <p className="mb-0">Servings</p>
            </div>
        </div>

        <div className="nutrient-tables-container">
            
            {Object.keys(nutrients).map(category => {
                return (
                <table className="table" key={`${category}-table`}>
                    <colgroup>
                        <col style={{width: '50%'}}/>
                        <col style={{width: '40%'}}/>
                        <col style={{width: '10%'}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>{titleCase(category)}</th>
                            <th>Amount</th>
                            <th>% DV</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(nutrients[category]).map(nutrient => {
                            return (
                            <tr key={`${nutrient}-tr`}>
                                <td>{titleCase(nutrient)}</td>
                                <td>
                                    <input type="number" min="0" className="nutrient-input" value={nutritionData[nutrient].amount}
                                    name={nutrient} onChange={e => handleChange(nutrients[category][nutrient]?.dv, e)} onInput={removeTrailingZeros}/>
                                    {nutrients[category][nutrient]?.unit}
                                </td>
                                <td>
                                    {nutrients[category][nutrient]?.dv != null?
                                    <>
                                    <input type="number" min="0" className="nutrient-input" value={nutritionData[nutrient].dv}
                                    onChange={e => updateDv(nutrient, nutrients[category][nutrient]?.dv, e)} onInput={removeTrailingZeros}/>
                                    <span>%</span>
                                    </>: ''}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                )
            })}
            

        </div>

      </div>
    </>
  );
};

export default NutritionDataForm;
