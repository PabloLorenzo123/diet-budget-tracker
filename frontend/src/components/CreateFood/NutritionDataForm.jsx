import { useState, useEffect } from "react";
import {nutrients} from '../../lib/nutrients.js';


const NutritionDataForm = () => {
  const [isManual, setIsManual] = useState(false);

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

        <div className="nutrient-data">
            <p className="fw-bold h5">Nutrition Overview</p>
            <p className="text-muted">Percent daily values (DV%) are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your targets.</p>
            <div className="d-flex align-items-center">
                <label htmlFor="servingInput" className="me-2">Nutrients in: </label>
                <input type="number" id="servingInput" className="form-control me-4"  min="1" style={{width: '70px'}}/>
                <p className="mb-0">Servings</p>
            </div>
        </div>

        <div className="nutrient-data tables">
            <table className="table">
                <thead>
                    <tr>
                        <th>General</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(nutrients.general).map(key => {
                        <tr>
                            <td>{key}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

      </div>
    </>
  );
};

export default NutritionDataForm;
