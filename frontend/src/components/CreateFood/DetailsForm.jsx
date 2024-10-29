import { useState, useEffect } from "react";
import { roundTo } from "../../lib/functions";
import { dailyValues } from "../../lib/nutrients";

const DetailsForm = ({foodData, setFoodData, nutritionData, setNutritionData}) => {

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFoodData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleGramWeightChange = (e) => {
        const newGramWeight = e.target.value;
        const prevGramWeight = foodData.gramWeight;
        setFoodData(prev => ({...prev, gramWeight: newGramWeight}));
        // Update nutrition tables.
        let nutritionDataCopy = {...nutritionData};
        Object.keys(nutritionDataCopy).forEach(nutrient => {
            const amount = roundTo(newGramWeight * nutritionDataCopy[nutrient] / prevGramWeight, 2);
            const dv = roundTo(amount / dailyValues[nutrient] * 100, 2);
            nutritionData[nutrient] = {amount, dv}
        })
        setNutritionData(nutritionDataCopy);
    }


    return (
        <>
        <div className="create-food-form">
                <p className="fw-bold h4">Info</p>

                <div className="row mb-3">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Product Full Name</label>
                    <div className="col-sm-8">
                        <input type="text" id="productName" placeholder="Full product name" onChange={handleChange}
                        className="form-control" name="productName" value={foodData.productName}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="productLink" className="col-sm-2 col-form-label">Product Link</label>
                    <div className="col-sm-8">
                        <input type="urls" id="productLink" placeholder="Product Link" onChange={handleChange}
                        className="form-control" name="productLink" value={foodData.productLink}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="servingTable" className="col-sm-2 col-form-label">Serving Sizes</label>
                    <div className="col-sm-6">
                        <table id="servingTable" className="table serving-table">
                            <colgroup>
                                <col style={{width: '33%'}}/>
                                <col style={{width: '33%'}}/>
                                <col style={{width: '33%'}}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th># Servings</th>
                                    <th>Measure</th>
                                    <th>Grams</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="number" min="1" onChange={handleChange} className="form-control"
                                        name="servings" value={foodData.servings}/>
                                    </td>
                                    <td>
                                        <input type="text" onChange={handleChange} className="form-control" name="measure" value={foodData.measure}/>
                                    </td>
                                    <td>
                                        <input type='number'
                                        min='1'
                                        placeholder="n/a"
                                        onChange={handleGramWeightChange}
                                        className="form-control"
                                        name="gramWeight"
                                        value={foodData.gramWeight} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="productPrice" className="col-sm-2 col-form-label">Product Price</label>
                    <div className="col-sm-2">
                        <input type="number" min="1" step="0.01" id="productPrice" placeholder="Product Price" className="form-control"/>
                    </div>
                </div>
                
                <div className="mb-3">
                    
                </div>

            </div>
        </>
    )
}

export default DetailsForm;
