import {useState, useEffect} from 'react';
import api from '../../../api';
import { transformNutrientData, areArraysEqual } from '../../../lib/functions';

import { toast } from 'react-toastify';

const SaveDietBtn = ({dietPlanName, meals, dailyTargets, dietPlanId}) => {
    
    const [prevMeals, setPrevMeals] = useState([...meals]);
    const [prevDietPlanName, setPrevPlanName] = useState(dietPlanName);
    
    const transformDays = () => {
        return meals.map(day => {
            return {
                meals: day.map(m => ({
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

    const saveDietPlan = async () => {
        try {
            const requestBody = {
                name: dietPlanName,
                budget: dailyTargets.budget,
                nutrientTargets: transformNutrientData(dailyTargets),
                days: transformDays(),
            }
            const res = await api.post('diet/diet-plan/', requestBody)
            if (res.status == 201) {
                toast.success(`${dietPlanName} saved.`);
            }
        } catch (err) {
            console.log(err);
            toast.error(`${dietPlanName} couldn't be saved.`);
        }
    }

    const saveDietPlanChanges = async () => {
        try {
            const requestBody = {
                id: dietPlanId,
                name: dietPlanName,
                budget: dailyTargets.budget,
                nutrientTargets: transformNutrientData(dailyTargets),
                days: transformDays(),
            }
            const res = await api.put('diet/diet-plan/', requestBody);
            if (res.status == 201){
                toast.success(`${dietPlanName} changes saved.`);
            }
        } catch (err) {
            console.log(err);
            toast.error(`${dietPlanName} changes couldn't be saved.`)
        }
    }

    const saveChangesDisabled = areArraysEqual(prevMeals, meals) && prevDietPlanName == dietPlanName;

    // If dietPlanId is not null, it means the user is seeing an already created dietplan.
    return (
    <>
        {dietPlanId && 
        <button
            className='btn btn-primary'
            type="button"
            disabled={saveChangesDisabled}
            onClick={saveDietPlanChanges}
        >
            Save Changes    
        </button>}
        <button
            className="btn btn-primary"
            type="button"
            onClick={saveDietPlan}
        >
            {dietPlanId? 'Save As New Diet Plan': 'Save Diet Plan'}
        </button>
    </>
    )
}

export default SaveDietBtn;
