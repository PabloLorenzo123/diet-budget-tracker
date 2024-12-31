import {useState, useEffect} from 'react';
import api from '../../../api';
import {areArraysEqual, areObjectsEqual } from '../../../lib/functions';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SaveDietBtn = ({dietPlanName, meals, dailyTargets, dietPlanId}) => {
    
    const navigate = useNavigate();

    const [prev, setPrev] = useState({
        meals: [...meals],
        dailyTargets: {...dailyTargets},
        dietPlanName,
    }) // This state is used to determine if the user can save changes.

    // Save changes btn states.
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);

    // Save Diet Plan btn states.
    const [saveDietPlanLoading, setSaveDietPlanLoading] = useState(false);

    const transformDays = () => {
        return meals.map(day => {
            return {
                meals: day.filter(m => !m.hideFromDiary).map(m => ({
                    name: m.name,
                    foods: m.foods.map(f => {
                        return ({
                            id: f.id,
                            servings: Number.parseFloat(f.diaryData.servings),
                            servingMeasureInGrams: Number.parseFloat(f.diaryData.servingMeasure.valueInGrams)
                        })
                    })
                }))
            }
        })
    }

    const transformDailyTargets = () => {
        const transformedDT = {};
        Object.entries(dailyTargets).forEach(([key, val]) => {
            transformedDT[key] = val.amount;
        })
        return transformedDT;
    }

    const saveDietPlan = async () => {
        try {
            setSaveDietPlanLoading(true); // For aesthetic purposes.
            const requestBody = {
                name: dietPlanName,
                budget: dailyTargets.budget,
                nutrientTargets: transformDailyTargets(),
                days: transformDays(),
            }
            const res = await api.post('diet/diet-plan/', requestBody)
            if (res.status == 201) {
                toast.success(`${dietPlanName} saved.`);
                navigate(`/dietplans/${res.data.id}`);
            }
        } catch (err) {
            console.log(err);
            toast.error(`${dietPlanName} couldn't be saved.`);
        } finally {
            setSaveDietPlanLoading(false);
        }
    }

    const saveDietPlanChanges = async () => {
        try {
            setSaveChangesLoading(true);
            const requestBody = {
                id: dietPlanId,
                name: dietPlanName,
                budget: dailyTargets.budget,
                nutrientTargets: transformDailyTargets(),
                days: transformDays(),
            }
            const res = await api.put('diet/diet-plan/', requestBody);
            if (res.status == 201){
                toast.success(`${dietPlanName} changes saved.`);
                setPrev(() => ({
                    meals: [...meals],
                    dailyTargets: {...dailyTargets},
                    dietPlanName,
                }))
            }
        } catch (err) {
            console.log(err);
            toast.error(`${dietPlanName} changes couldn't be saved.`)
        } finally {
            setSaveChangesLoading(false);
        }
    }

    const isDietPlanNotEmpty = () => {
        return meals.some(d => {
            return d.filter(m => !m.hideFromDiary).some(m => m.foods.length > 0);
        })
    }

    const saveChangesDisabled = () => {
        return areArraysEqual(prev.meals, meals)
        && prev.dietPlanName == dietPlanName
        && areObjectsEqual(prev.dailyTargets, dailyTargets);
    }

    const saveDietPlanDisabled = !(dietPlanName && isDietPlanNotEmpty());

    // If dietPlanId is not null, it means the user is seeing an already created dietplan.
    return (
    <>
        {/* If the diet plan is an already created one then show the option to save changes */}
        {dietPlanId && 
            <button
                className='btn btn-primary'
                type="button"
                disabled={saveChangesDisabled()}
                onClick={saveDietPlanChanges}
            >
                {saveChangesLoading?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>:
                    'Save Changes'
                }    
            </button>
        }
        <button
            className="btn btn-primary"
            type="button"
            onClick={saveDietPlan}
            disabled={saveDietPlanDisabled}
        >
            {
            saveDietPlanLoading?
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            dietPlanId? 'Save As a New Diet Plan': 'Save Diet Plan'
            }
        </button>
    </>
    )
}

export default SaveDietBtn;
