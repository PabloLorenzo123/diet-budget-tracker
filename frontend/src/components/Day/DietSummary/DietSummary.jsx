import { useState, useEffect } from "react";
import DietSummaryModal from "./DietSummaryModal";

const DietSummary = ({meals, dailyTargets}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label for="dietPlanName" className="col-form-label">
                        <span className="h5">
                            Diet Plan
                        </span>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        id="dietPlanName"
                        type="text"
                        className="bg-transparent border-0 border-1 border-dark border-bottom"
                        placeholder="Diet Plan Name"
                    />
                </div>
            </div>
                
            <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button" onClick={() => setShowModal(true)}>Summary</button>
                <button className="btn btn-primary" type="button">Save Diet Plan</button>
            </div>

            {
                showModal && 
                <DietSummaryModal
                    meals={meals}
                    setShowModal={setShowModal}
                />
            }
        </>
    )
}

export default DietSummary;
