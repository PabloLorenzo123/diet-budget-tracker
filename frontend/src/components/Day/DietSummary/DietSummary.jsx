import { useState, useEffect } from "react";
import DietSummaryModal from "./DietSummaryModal";
import SaveDietBtn from "./SaveDietBtn";

const DietSummary = ({meals, dailyTargets, dietPlanName, setDietPlanName, dietPlanId, showOrHideRightColumn}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showOrHideRightColumn(showModal);
    }, [showModal]);

    const handleOnChange = (e) => setDietPlanName(e.target.value);

    const isDietPlanEmpty = () => {
        return !meals.some(day => day.some(m => m.foods.some(f => f)));
    }

    return (
        <>
            <div className="row g-3 align-items-center">
                <div className="col-sm-4">
                    <label htmlFor="dietPlanName" className="col-form-label">
                        <span className="h5">
                            Diet Plan
                        </span>
                    </label>
                </div>
                <div className="col-sm">
                    <input
                        id="dietPlanName"
                        type="text"
                        onChange={handleOnChange}
                        value={dietPlanName}
                        className="bg-transparent border-0 border-1 border-dark border-bottom"
                        placeholder="Diet Plan Name"
                        style={{width: '100%'}}
                    />
                </div>
            </div>
                
            <div className="d-grid gap-2">
                <button
                    className="btn btn-secondary"
                    type="button"
                    disabled={isDietPlanEmpty()}
                    onClick={() => setShowModal(true)}
                >
                    Summary
                </button>

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
