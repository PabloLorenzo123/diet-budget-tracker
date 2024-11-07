import {useState, useEffect} from "react";
import { titleCase, validateDecimalNumberInput, roundTo } from "../lib/functions";
import { nutrientsInformation, nutrientsTable } from "../lib/nutrients";

const NutrientsTable = ({nutritionData, setNutritionData}) => {
    const unitSpanStyle = {width: '25px'};

    const handleChange = (e) => {
        const { name, value } = e.target;
        const dv = nutrientsInformation[name].dv;
        setNutritionData((prev) => ({
          ...prev,
          [name]: {
            amount: value || 0,
            dv: roundTo((value / dv) * 100, 2) || 0
          }
        }));
    };

    const updateDv = (e) => {
        const {name, value} = e.target;
        const nutrient = name.match(/^(\w+)-dv$/)[1]; // From calories-dv extract 'calories'.
        const dv = value / 100;
        const amount = roundTo(nutrientsInformation[nutrient].dv * dv, 2);
        setNutritionData(prev => ({
            ...prev,
            [nutrient]: {amount, dv: value}
        }))
    }

    return (
        <>
        {Object.keys(nutrientsTable).map(category => {
            return (
                <table key={category} className="nutrient-table table">
                        <colgroup>
                            <col style={{ width: "40%" }} />
                            <col style={{ width: "40%" }} />
                            <col style={{ width: "20%" }} />
                        </colgroup>
                    <thead>
                        <tr>
                            <th>{titleCase(category)}</th>
                            <th><span className="ms-4">Amount</span></th>
                            <th>DV</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nutrientsTable[category].map(nutrientObj => {
                            return (
                                <tr key={nutrientObj.name}>
                                    <td>{titleCase(nutrientObj.altName)}</td>
                                    {/* Amount input */}
                                    <td>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                inputMode="decimal" // Enables numeric keypad on mobile
                                                className="nutrient-input"
                                                value={nutritionData[nutrientObj.name].amount}
                                                name={nutrientObj.name}
                                                onChange={handleChange}
                                                onInput={validateDecimalNumberInput}
                                            />
                                            <span className="text-center" style={unitSpanStyle}>
                                                {nutrientObj.unit}
                                            </span>  
                                        </div>
                                    </td>
                                    {/* DV Input */}
                                    <td>
                                        {nutrientObj.dv != null && 
                                            <>
                                            {/* If this nutrient has a daily recomendation intake then make it an input */}
                                            <div className="d-flex justify-content-end">
                                                    <input
                                                    type="text"
                                                    inputMode="decimal" // Enables numeric keypad on mobile
                                                    className="nutrient-input"
                                                    name={`${nutrientObj.name}-dv`}
                                                    value={nutritionData[nutrientObj.name].dv}
                                                    onChange={updateDv}
                                                    onInput={validateDecimalNumberInput}
                                                    />
                                                    <span>%</span>
                                            </div>
                                            </>
                                            }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        })}
        </>
    )
}

export default NutrientsTable;