import { useEffect, useState } from "react";
import api from '../../../api.js';
import { nutrientsInformation, nutrientState } from "../../../lib/nutrients.js";
import { roundTo } from "../../../lib/functions.js";

const ManualOrSearchFood = ({foodData, setFoodData, nutritionData, setNutritionData}) => {
    const [isManual, setIsManual] = useState(false);

    const [searchInput, setSearchInput] = useState({
        query: '',
        branded: false
    });

    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchResult, setSelectedSearchResult] = useState(''); // fdcid of the result selected.

    const [foodPortionsLoading, setFoodPortionsLoading] = useState(false);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);

    const searchFoodInDB = async () => {
        if (!searchInput.query) {
            return;
        }
        setSearchResultsLoading(true);
        try {
            const res = await api.get(`diet/search_foods/?query=${searchInput.query}&branded=${searchInput.branded}`);
            const data = res.data;
            if (res.status == 200) {
                setSearchResults(data.foods);
            }
        } catch (error) {
            console.log(error);
        } 
        setSearchResultsLoading(false);
    }

    const selectSearchResult = async (fdcId) => {
        if (selectedSearchResult == fdcId) return;

        setSelectedSearchResult(fdcId);

        // Find the result selected.
        const searchResultsCopy = [...searchResults];
        const resultSelected = searchResultsCopy.find(el => el.fdcId == fdcId);

        // If the user didn't input grams in the DetailsForm then.
        if (!foodData.gramWeight){
            await setFoodData(prev => ({...prev, gramWeight: resultSelected.servingSize}));
        }

        // Update the nutrition tables.
        
        const nutrients = {...nutrientState};
        console.log(resultSelected.foodNutrients);
        Object.keys(resultSelected.foodNutrients).forEach(nutrient => {
            
            if (nutrientsInformation[nutrient]){
                const gramWeight = foodData.gramWeight || resultSelected.servingSize; // If n/a then use the serving size of the result selected.
                const amount = roundTo(gramWeight * resultSelected.foodNutrients[nutrient] / resultSelected.servingSize, 2) || 0;
                const dv = roundTo(amount / nutrientsInformation[nutrient].dv * 100, 2);
                nutrients[nutrient] = {amount: amount, dv: dv}; // Differeance between fullFoodN.. and foodNutri.. is the former is a dictionary.
            }
            
        })
        
        setNutritionData({...nutrientState, ...nutrients}); // Need to add nutrientState because there may be nutrients not defined.

        // If the food selected is not branded then we need its food portions.
        if ((!resultSelected.brandName || !resultSelected.brandOwner) && !resultSelected.foodPortions && !searchInput.branded){ // If foodPortions is already defined, don't ask again.
            setFoodPortionsLoading(true);
            try {
                const res = await api.get(`diet/search_food/?fdcId=${fdcId}`);
                // If the food is not branded we want to show the different serving sizes.
                resultSelected.foodPortions = res.data.foodPortions;
            } catch (error) {
                // If not found.
                resultSelected.foodPortions = [{
                    'measureUnit': 'g',
                    'amount': 1.0,
                    'gramWeight': 100
                }]
            }
            setFoodPortionsLoading(false);
        }

        setSearchResults(searchResultsCopy);
    }

    
    const updateServingSize = (food, grams) => {
        
        setFoodData(prev => ({...prev, gramWeight: grams})); // Update gram weight.

        const nutritionDataCopy = {...nutritionData};
        Object.keys(nutritionDataCopy).forEach(nutrient => {
            const amount = roundTo(grams * food.foodNutrients?.[nutrient] / food.servingSize, 2) || 0;
            const dv = roundTo(amount / nutrientsInformation[nutrient].dv * 100, 2);
            nutritionDataCopy[nutrient] = {amount, dv};
        });
        
        setNutritionData(nutritionDataCopy);
    }

    useEffect(() => {
        // When user gram weight changes, update the nutrition table accordingly.
        if (selectedSearchResult){
            const food = searchResults.find(result => result.fdcId == selectedSearchResult);
            updateServingSize(food, foodData.gramWeight);
        }
    }, [foodData.gramWeight])
    
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
                    Is this an unbranded minimally processed food (e.g., eggs, vegbles) or a
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

                <button type="button" disabled={(isManual || !searchInput.query)? true: false} className="btn btn-secondary mb-2" onClick={searchFoodInDB}>
                    Search
                </button>

                <div className="cf-search-results">
                    <h6 className="fw-bold">Search Results</h6>

                    <div className="results">
                    {searchResultsLoading?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        searchResults.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Serving Size</th>
                                    <th>Energy (kcal)</th>
                                    <th>Protein (g)</th>
                                    <th>Carbs (g)</th>
                                    <th>Fat (g)</th>
                                    <th>Ingredients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(result => {
                                    return (
                                        <tr key={result.fdcId} onClick={() => selectSearchResult(result.fdcId)} className={result.fdcId == selectedSearchResult? 'selected': ''}>
                                            <td>{result.description}</td>
                                            <td>
                                                
                                                {result.fdcId == selectedSearchResult?
                                                    result.foodPortions?
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
                                                        foodPortionsLoading?
                                                        <div className="d-flex">
                                                            <div className="spinner-border" role="status" style={{width: '2rem', height: '2rem'}}>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                        :
                                                        `${result.servingSize}${result.servingSizeUnit}`
                                                :
                                                `${result.servingSize}${result.servingSizeUnit}`
                                                }
                                                
                                            </td>
                                            <td>{result.foodNutrients.energy}</td>
                                            <td>{result.foodNutrients.protein}</td>
                                            <td>{result.foodNutrients.netCarbs}</td>
                                            <td>{result.foodNutrients.totalFat}</td>
                                            <td>{result.ingredients}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ManualOrSearchFood