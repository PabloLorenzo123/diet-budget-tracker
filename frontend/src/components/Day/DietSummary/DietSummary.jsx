import { useState, useEffect } from "react";
import DietSummaryModal from "./DietSummaryModal";
import SaveDietBtn from "./SaveDietBtn";

const DietSummary = ({meals, dailyTargets, dietPlanName, setDietPlanName, dietPlanId}) => {
    const [showModal, setShowModal] = useState(false);

    const handleOnChange = (e) => setDietPlanName(e.target.value);

    return (
        <>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="dietPlanName" className="col-form-label">
                        <span className="h5">
                            Diet Plan
                        </span>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        id="dietPlanName"
                        type="text"
                        onChange={handleOnChange}
                        value={dietPlanName}
                        className="bg-transparent border-0 border-1 border-dark border-bottom"
                        placeholder="Diet Plan Name"
                    />
                </div>
            </div>
                
            <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button" onClick={() => setShowModal(true)}>Summary</button>
                <SaveDietBtn
                    dietPlanName={dietPlanName}
                    meals={meals}
                    dailyTargets={dailyTargets}
                    dietPlanId={dietPlanId}
                />
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
