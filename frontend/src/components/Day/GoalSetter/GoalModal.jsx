import { useState, useEffect } from "react";
import { titleCase, validateDecimalNumberInput } from "../../../lib/functions";
import { dailyValues, nutrients } from "../../../lib/nutrients";
import Modal from "../../Modal";

const GoalModal = ({showModal, setShowModal, dailyTargets, setDailyTargets, handleChange}) => {

    const unitSpanStyle = {width: '25px'};

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
                                        onChange={handleChange}
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
                {Object.keys(nutrients).map(category => {
                    return (
                        <table key={category} className="nutrient-table table">
                            <thead>
                                <tr>
                                    <th>{titleCase(category)}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(nutrients[category]).map(nutrient => {
                                    return (
                                        <tr>
                                            <td>{titleCase(nutrient)}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <input
                                                        type="text"
                                                        inputMode="decimal" // Enables numeric keypad on mobile
                                                        className="nutrient-input ms-auto"
                                                        value={dailyTargets[nutrient]}
                                                        name={nutrient}
                                                        onChange={handleChange}
                                                        onInput={validateDecimalNumberInput}
                                                    />
                                                    <span className="text-center" style={unitSpanStyle}>
                                                        {nutrients[category][nutrient].unit}
                                                    </span>
                                                    
                                                </div>
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
                <button type="button" className="btn btn-primary">
                    Save Changes
                </button>
            </div>
         </Modal>
    )
}

export default GoalModal;
