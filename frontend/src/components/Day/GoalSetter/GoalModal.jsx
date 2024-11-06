import { useState, useEffect } from "react";
import { titleCase, validateDecimalNumberInput } from "../../../lib/functions";
import { dailyValues, nutrientsTable } from "../../../lib/nutrients";
import { roundTo } from "../../../lib/functions";
import Modal from "../../Modal";

const GoalModal = ({showModal, setShowModal, dailyTargets, setDailyTargets, handleBudgetChange, handleChange, saveDailyTargets, isSaveBtnDisabled}) => {

    const unitSpanStyle = {width: '25px'};

    const updateDv = (e) => {
        const {name, value} = e.target;
        const nutrient = name.match(/^(\w+)-dv$/)[1]; // From calories-dv extract 'calories'.
        const dv = value / 100;
        const amount = roundTo(dailyValues[nutrient] * dv, 2);
        setDailyTargets(prev => ({
            ...prev,
            [nutrient]: {amount, dv: value}
        }))
    }

    return (
        <Modal showModal={showModal} setShow={setShowModal}>
            <div className="custom-modal-header mb-4">
                <h4>Set your daily goals</h4>
            </div>
            <hr className="border border-primary border-3 opacity-75" />
            <div className="nutrient-tables-container" style={{height: '80%', overflowY: 'auto', padding: '10px'}}>
                <table className="nutrient-table table">
                    <thead>
                        <tr>
                            <th>Budget</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Budget</td>
                            <td>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        inputMode="decimal" // Enables numeric keypad on mobile
                                        className="nutrient-input ms-auto"
                                        value={dailyTargets.budget}
                                        name='budget'
                                        onChange={handleBudgetChange}
                                        onInput={validateDecimalNumberInput}
                                    />
                                    <span className="text-center" style={unitSpanStyle}>
                                        $
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                                        <tr key={nutrientObj}>
                                            <td>{titleCase(nutrientObj.altName)}</td>
                                            {/* Amount input */}
                                            <td>
                                                <div className="d-flex">
                                                    <input
                                                        type="text"
                                                        inputMode="decimal" // Enables numeric keypad on mobile
                                                        className="nutrient-input"
                                                        value={dailyTargets[nutrientObj.name].amount}
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
                                                            value={dailyTargets[nutrientObj.name].dv}
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
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" onClick={saveDailyTargets} disabled={isSaveBtnDisabled}>
                    Save Changes
                </button>
            </div>
         </Modal>
    )
}

export default GoalModal;
