import { useState, useEffect } from "react";
import { titleCase, validateDecimalNumberInput } from "../../../lib/functions";
import { nutrientsInformation, nutrientsTable } from "../../../lib/nutrients";
import { roundTo } from "../../../lib/functions";
import Modal from "../../Modal";
import NutrientsTable from "../../NutrientsTable";

const GoalModal = ({showModal, setShowModal, dailyTargets, setDailyTargets, handleBudgetChange, saveDailyTargets, isSaveBtnDisabled, isLoading, isLoadingSuccesful}) => {
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
                <NutrientsTable
                    nutritionData={dailyTargets}
                    setNutritionData={setDailyTargets}
                />
            </div>
            <div className="d-flex justify-content-center">
                <button
                type="button"
                className="btn btn-primary"
                onClick={saveDailyTargets}
                disabled={isSaveBtnDisabled}
                style={{width: '150px'}}>
                    {isLoading?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>:
                        isLoadingSuccesful?
                        <span className="material-symbols-outlined text-dark" style={{color: 'white'}}>
                            check_circle
                        </span>:
                        'Save Changes'
                    }
                </button>
            </div>
         </Modal>
    )
}

export default GoalModal;
