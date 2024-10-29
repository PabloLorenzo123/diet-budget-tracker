import { useState } from "react";
import api from '../../api.js';
import { dailyValues, nutrientState } from "../../lib/nutrients.js";
import { roundTo } from "../../lib/functions.js";

const ManualOrSearchFood = ({foodData, setFoodData, nutritionData, setNutritionData}) => {
    const [isManual, setIsManual] = useState(false);
    const [searchInput, setSearchInput] = useState({
        query: '',
        branded: false
    });
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchResult, setSelectedSearchResult] = useState(''); // fdcid of the result selected.

    const searchFoodInDB = async () => {
        if (!searchInput) {
            return;
        }
        const res = await api.get(`diet/search_foods/?query=${searchInput.query}&branded=${searchInput.branded}`);
        const data = res.data;
        setSearchResults(data.foods);
    }

    const selectSearchResult = async (fdcId) => {
        if (selectedSearchResult == fdcId) return;

        setSelectedSearchResult(fdcId);

        // Check if this search result has already been selected before.
        const searchResultsCopy = [...searchResults];
        const resultSelected = searchResultsCopy.find(el => el.fdcId == fdcId);

        let data;

        if (!resultSelected.fullfoodNutrients) {
            if (!searchInput.branded){
                try {
                    const res = await api.get(`diet/search_food/?fdcId=${fdcId}`);
                    data = res.data.foodNutrients;
    
                    // If the food is not branded we want to show the different serving sizes.
                    resultSelected.foodPortions = res.data.foodPortions;  
                } catch (error) {
                    data = {...resultSelected.foodNutrients}; // If the food is not found then get the foodNutrients retrieved from search_foods/.
                }
            } else {
                data = {...resultSelected.foodNutrients}; // If the food is branded don't need to fetch for more information.
            }

            // If the user didn't input grams in the NutritionDataForm then.
            if (!foodData.gramWeight){
                await setFoodData(prev => ({...prev, gramWeight: resultSelected.servingSize}));
            }
            
            // Transform the response so each key is a dictionary with amount and dv keys justs as the nutritionData state.
            Object.keys(data).forEach(nutrient => {
                const amount = roundTo(foodData.gramWeight * data[nutrient] / resultSelected.servingSize, 2) || 0;
                const dv = roundTo(foodData.gramWeight / dailyValues[nutrient] * 100, 2);

                data[nutrient] = {amount, dv}
            })
            resultSelected.fullfoodNutrients = data; // To avoid making the same api call twice.
            
            setSearchResults(searchResultsCopy);
        } else {
            data = resultSelected.fullfoodNutrients;
        }
        console.log(data);
        setNutritionData(prev => ({...prev, ...data})) // Update nutritionData state. Update nutritionData state so nutrition tables update.
    }

    
    const updateServingSize = (food, grams) => {
        
        setFoodData(prev => ({...prev, gramWeight: grams})); // Update gram weight.

        const nutritionDataCopy = {...nutritionData};
        Object.keys(nutritionDataCopy).forEach(nutrient => {
            const amount = roundTo(grams * food.fullfoodNutrients[nutrient]?.amount / food.servingSize, 2) || 0;
            const dv = roundTo(amount / dailyValues[nutrient] * 100, 2);
            nutritionDataCopy[nutrient] = {amount, dv};
        });
        
        setNutritionData(prev => ({...prev, ...nutritionDataCopy}));
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

                <div className="cf-search-results">
                    <h6 className="fw-bold">Search Results</h6>

                    <div className="results">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Serving Size</th>
                                    <th>Energy (kcal)</th>
                                    <th>Protein</th>
                                    <th>Carbs</th>
                                    <th>Fat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(result => {
                                    return (
                                        <tr key={result.fdcId} onClick={() => selectSearchResult(result.fdcId)} className={result.fdcId == selectedSearchResult? 'selected': ''}>
                                            <td>{result.description}</td>
                                            <td>
                                                {result.foodPortions && result.fdcId == selectedSearchResult?
                                                <select onChange={e => updateServingSize(result, e.target.value)} defaultValue={100}>
                                                    <option value={100}>
                                                        (100g)
                                                    </option>
                                                    {result.foodPortions.map((portion, idx) => {
                                                        return (
                                                            <option key={idx} value={portion.gramWeight}>
                                                                {portion.amount} {portion.measureUnit} ({portion.gramWeight}g)
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                                :
                                                `${result.servingSize}${result.servingSizeUnit}`
                                                }
                                                
                                            </td>
                                            <td>{result.foodNutrients.energy}</td>
                                            <td>{result.foodNutrients.protein}</td>
                                            <td>{result.foodNutrients.netCarbs}</td>
                                            <td>{result.foodNutrients.totalFat}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ManualOrSearchFood