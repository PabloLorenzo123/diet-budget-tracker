import { useState } from "react";
import api from '../../api.js';

const ManualOrSearchFood = ({nutritionData, setNutritionData}) => {
    const [isManual, setIsManual] = useState(false);
    const [searchInput, setSearchInput] = useState({
        query: '',
        branded: false
    });

    const searchFoodInDB = async () => {
        if (!searchInput) {
            return;
        }
        const res = await api.get(`diet/search_foods?query=${searchInput.query}&branded=${searchInput.branded}`);
    }
    
    return (
        <>
            <p className="fw-bold h4">Nutrition Info</p>
            <p className="form-text">
            Would you like to enter the nutritional information manually?
            </p>
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

            <div className="search-container">
                <h6 className="fw-bold">Search Form</h6>
                <div className="row mt-3 mb-4">
                    <div className="col-10 col-sm-8">
                        <input
                        type="text"
                        disabled={isManual}
                        className="form-control"
                        placeholder="Search for nutritional information (e.g., beef, sardines, eggs)"
                        value={searchInput.query}
                        onChange={(e) =>
                        setSearchInput((prev) => ({ ...prev, query: e.target.value }))
                        }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    
                    <p className="form-text">
                    Is this an unbranded minimally processed food (e.g., eggs, vegetables) or a
                    processed an labeled item?
                    </p>
                    <div className="col d-flex align-items-center">
                        <label className="form-check-label me-3">
                            <input
                            type="radio"
                            name="foodType"
                            className="form-check-input me-1"
                            checked={searchInput.branded === false}
                            disabled={isManual}
                            onChange={() => setSearchInput((prev) => ({ ...prev, branded: false }))}
                            />
                            Commodity Food
                        </label>
                        <label className="form-check-label">
                            <input
                            type="radio"
                            name="foodType"
                            className="form-check-input me-1"
                            checked={searchInput.branded === true}
                            disabled={isManual}
                            onChange={() => setSearchInput((prev) => ({ ...prev, branded: true }))}
                            />
                            Branded Food
                        </label>
                    </div>
                </div>

                
                <button type="button" disabled={isManual} className="btn btn-secondary mb-2" onClick={searchFoodInDB}>
                    Search
                </button>

                <div className="search-results">
                    <h6 className="fw-bold">Search Results</h6>
                </div>
                
            </div>
        </>
    )
}

export default ManualOrSearchFood