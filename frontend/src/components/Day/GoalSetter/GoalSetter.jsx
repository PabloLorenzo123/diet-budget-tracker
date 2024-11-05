import { useState, useEffect } from "react";
import '../../../styles/dairy/GoalSetter.css';
import GoalModal from "./GoalModal";
import { validateDecimalNumberInput } from "../../../lib/functions";

const GoalSetter = ({dailyTargets, setDailyTargets}) => {
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDailyTargets(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <>
        { /* <p className="fw-bold m-0 me-2">Set your daily goals</p> */}
        <div className="goal-setter-container d-flex flex-wrap align-items-center justify-content-between"> 
            {/* Budget Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="budget" className="d-flex align-items-center">
                    <span>Budget</span>
                    <span className="material-symbols-outlined" style={{color: 'green'}}>
                        attach_money
                    </span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    className="form-control"
                    placeholder="Budget"
                    name="budget"
                    value={dailyTargets.budget}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Calories Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="calories" className="d-flex align-items-center">
                    <span className="me-1">Calories</span>
                    <span class="material-symbols-outlined">
                        bolt
                    </span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="calories"
                    className="form-control"
                    placeholder="kcal"
                    name="energy"
                    value={dailyTargets.energy}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Protein Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="protein" className="d-flex align-items-center">
                    <span className="me-1">Protein</span>
                    <span class="material-symbols-outlined">
                        fitness_center
                    </span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="protein"
                    className="form-control"
                    placeholder="g"
                    name="protein"
                    value={dailyTargets.protein}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Carbohydrates Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="carbs" className="d-flex align-items-center">
                    <span className="me-1">Carbs</span>
                    <span class="material-symbols-outlined">
                        sprint
                    </span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="carbs"
                    className="form-control"
                    placeholder="g"
                    name="netCarbs"
                    value={dailyTargets.netCarbs}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Fat Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="fat" className="d-flex align-items-center">
                    <span className="me-1">Fat</span>
                    <span class="material-symbols-outlined">
                        egg_alt
                    </span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="fat"
                    className="form-control"
                    placeholder="g"
                    name="totalFat"
                    value={dailyTargets.totalFat}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* More button */}
            <button
            className="more-btn d-flex align-items-center bg-transparent border-0 p-0 m-0 me-2"
            type="button"
            onClick={() => setShowModal(true)}
            >
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </button>
            {/* Save button */}
            <button type="button me-2" className="save-btn d-flex align-items-center bg-transparent border-0 p-0 m-0 me-2">
                <span class="material-symbols-outlined">
                    save
                </span>
            </button>
        </div>
        
        {showModal && 
            <GoalModal
            showModal={showModal}
            setShowModal={setShowModal}
            dailyTargets={dailyTargets}
            setDailyTargets={setDailyTargets}
            handleChange={handleChange}
            />
        }
        </>
    )
}

export default GoalSetter;
