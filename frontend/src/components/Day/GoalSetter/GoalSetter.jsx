import { useState, useEffect } from "react";

import GoalModal from "./GoalModal";
import { nutrientsInformation } from "../../../lib/nutrients";
import { validateDecimalNumberInput, roundTo } from "../../../lib/functions";
import { toast } from "react-toastify";
import api from "../../../api";
import '../../../styles/dairy/GoalSetter.css';

const GoalSetter = ({dailyTargets, setDailyTargets}) => {
    const [prevDailyTargets, setPrevDailyTargets] = useState({});

    const [isLoading, setIsLoading] = useState(false); // Use for the spinning wheel in the save btn.
    const [isLoadingSuccesful, setIsLoadingSuccesfull] = useState(false); // Use for the check mark in the save btn.

    const [showModal, setShowModal] = useState(false);

    const handleBudgetChange = (e) => setDailyTargets(prev => ({...prev, budget: e.target.value}));

    const handleChange = (e) => {
        const { name, value } = e.target;
        const dv = nutrientsInformation[name]?.dv;
        setDailyTargets((prev) => ({
          ...prev,
          [name]: {
            amount: value || 0,
            dv: roundTo((value / dv) * 100, 2) || 0
          }
        }));
    };

    const saveDailyTargets = async () => {
        if (prevDailyTargets == dailyTargets) return;
        setIsLoading(true);
        try {
            const body = {...dailyTargets}
            Object.keys(body).forEach(n => {
                if (nutrientsInformation[n]) {
                    body[n] = dailyTargets[n].amount;
                }
            });
            const res = await api.post('auth/daily_targets/', body);
            if (res.status == 200){
                setPrevDailyTargets(dailyTargets); // So the save btn becomes disabled.
                setIsLoading(false);
                setIsLoadingSuccesfull(true);
                setTimeout(() => setIsLoadingSuccesfull(false), 1000);
                return
            }
        } catch (error) {
            console.log(error);
            toast.error("Your daily targets could not be saved, try again later.");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getDailyTargets = async () => {
            try {
                const res = await api.get('auth/daily_targets/');
                if (res.status == 200){
                    const resData = res.data.dailyTargets;
                    Object.keys(resData).forEach(nutrient => {
                        if (nutrientsInformation[nutrient]){ // Only budget would fail this if condition.
                            const value = resData[nutrient];
                            const dv = nutrientsInformation[nutrient]?.dv;
                            resData[nutrient] = {
                                amount: value,
                                dv: roundTo((value / dv) * 100, 2) || 0
                            }
                        }    
                    })
                    setPrevDailyTargets(resData); // This is used to determine if daily targets changes.
                    setDailyTargets(resData);
                }
            } catch (error) {
                console.log(`Could not retrieve user's daily targets. ${error}`);
            }
        }
        getDailyTargets()
    }, [])

    const isSaveBtnDisabled = prevDailyTargets == dailyTargets;

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
                    onChange={handleBudgetChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Calories Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="calories" className="d-flex align-items-center">
                    <span className="me-1">Calories</span>
                    <span className="material-symbols-outlined">
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
                    value={dailyTargets.energy.amount}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Protein Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="protein" className="d-flex align-items-center">
                    <span className="me-1">Protein</span>
                    <span className="material-symbols-outlined">
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
                    value={dailyTargets.protein.amount}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Carbohydrates Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="carbs" className="d-flex align-items-center">
                    <span className="me-1">Carbs</span>
                    <span className="material-symbols-outlined">
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
                    value={dailyTargets.netCarbs.amount}
                    onChange={handleChange}
                    onInput={validateDecimalNumberInput}
                />
            </div>
            {/* Fat Input */}
            <div className="d-flex align-items-center me-2">
                <label htmlFor="fat" className="d-flex align-items-center">
                    <span className="me-1">Fat</span>
                    <span className="material-symbols-outlined">
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
                    value={dailyTargets.totalFat.amount}
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
                <span className="material-symbols-outlined">
                    more_horiz
                </span>
            </button>
            {/* Save button */}
            <button 
            type="button me-2"
            className="save-btn d-flex align-items-center bg-transparent border-0 p-0 m-0 me-2"
            onClick={saveDailyTargets}
            disabled={isSaveBtnDisabled}
            >
                {isLoading? 
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>:
                    isLoadingSuccesful?
                        <span className="material-symbols-outlined text-dark" style={{color: 'green'}}>
                            check_circle
                        </span>:
                        <span className="material-symbols-outlined">
                            save
                        </span>
                }
                
            </button>
        </div>
        
        {showModal && 
            <GoalModal
                showModal={showModal}
                setShowModal={setShowModal}
                dailyTargets={dailyTargets}
                setDailyTargets={setDailyTargets}
                handleBudgetChange={handleBudgetChange}
                saveDailyTargets={saveDailyTargets}
                isSaveBtnDisabled={isSaveBtnDisabled}
                isLoading={isLoading}
                isLoadingSuccesful={isLoadingSuccesful}
            />
        }
        </>
    )
}

export default GoalSetter;
