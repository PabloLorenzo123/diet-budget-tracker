import { useState, useEffect } from "react";
import { roundTo, isNumber, validateDecimalNumberInput, titleCase } from "../../../lib/functions";
import { massUnits } from "../../../constants";

const DetailsForm = ({foodData, setFoodData, nutritionData, setNutritionData}) => {

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFoodData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // foodData.measurement.
    const handleMeasureUnitChange = (e) => {
        const measureUnitIdx = e.target.value;
        const measureUnit = massUnits[measureUnitIdx];
        let newAmount;
        if (foodData.measurement.amount){
            newAmount = roundTo(foodData.gramWeight / measureUnit.valueInGrams, 2)
        } else {
            newAmount = foodData.measurement.amount;
        }
        setFoodData(prev => ({
          ...prev,
          measurement: {
            unit: measureUnit,
            amount: newAmount,
          },
          gramWeight: measureUnit.valueInGrams * newAmount || 0,
        }))
    }

    const handleMeasureAmountChange = (e) => {
        const value = e.target.value;
        
        setFoodData(prev => ({
            ...prev,
            measurement: {
                ...prev.measurement,
                amount: value,
            },
            gramWeight: foodData.measurement.unit.valueInGrams * value || 0
        }))
    }



    return (
        <>
        <div className="create-food-form">
                <p className="fw-bold h4">Info</p>

                {/* General Info Form */}

                {/* Product Name */}
                <div className="row mb-3">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Full Name</label>
                    <div className="col-sm-8">
                        <input type="text" id="productName" placeholder="Full product name" onChange={handleChange}
                        className="form-control" name="productName" value={foodData.productName}/>
                    </div>
                </div>

                {/* Product Link */}
                <div className="row mb-3">
                    <label htmlFor="productLink" className="col-sm-2 col-form-label">Link</label>
                    <div className="col-sm-8">
                        <input type="urls" id="productLink" placeholder="Product Link" onChange={handleChange}
                        className="form-control" name="productLink" value={foodData.productLink}/>
                    </div>
                </div>

                {/* Product net content */}
                {/* <div className="row mb-3">
                    <label htmlFor="produtNetContent" className="col-sm-2 col-form-label">Net Content</label>
                    <div className="col-sm-1">
                        <input
                            type="text"
                            inputMode="decimal"
                            className="form-control"
                            name="netContent"
                            value={foodData.netContent.amount}
                        />
                    </div>
                    <div className="col-sm-1">
                        <select
                            className="form-control"
                            onChange={handleNetContentUnitChange}
                            value={massUnits.findIndex(mu => mu.unit == foodData.netContent.unit.unit)}
                        >
                            {massUnits.map((sm, idx) => {
                                return (
                                    <option key={idx} value={idx}>
                                        {titleCase(sm.name)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div> */}

                {/* Serving And Measurements Form */}
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
                                    <th>
                                        <select
                                            className="form-select"
                                            onChange={handleMeasureUnitChange}
                                            value={massUnits.findIndex(mu => mu.unit == foodData.measurement.unit.unit)}
                                        >
                                            {massUnits.map((sm, idx) => {
                                                return (
                                                    <option key={idx} value={idx}>
                                                        {titleCase(sm.name)}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            inputMode="decimal" // Enables numeric keypad on mobile
                                            onChange={handleChange}
                                            onInput={e => validateDecimalNumberInput(e, 1)}
                                            className="form-control"
                                            name="servings"
                                            value={foodData.servings}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            className="form-control"
                                            name="measure"
                                            value={foodData.measure}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            inputMode="decimal" // Enables numeric keypad on mobile
                                            placeholder="n/a"
                                            onChange={handleMeasureAmountChange}
                                            onInput={validateDecimalNumberInput}
                                            className="form-control"
                                            name="gramWeight"
                                            value={foodData.measurement.amount}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="productPrice" className="col-sm-2 col-form-label">Price in your currency</label>
                    <div className="col-sm-2">
                        <input
                        type="text"
                        inputMode="decimal"
                        onChange={handleChange}
                        onInput={validateDecimalNumberInput}
                        id="productPrice"
                        placeholder="Product Price"
                        className="form-control"
                        name="productPrice"
                        value={foodData.productPrice}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default DetailsForm;
