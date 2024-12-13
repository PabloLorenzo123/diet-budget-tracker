import {useState, useEffect} from 'react';
import api from '../../../api';
import { transformNutrientData } from '../../../lib/functions';

import { toast } from 'react-toastify';

const SaveDietBtn = ({dietPlanName, meals, dailyTargets}) => {
    const handleOnClick = async () => {
        console.log(dailyTargets);
        try {
            const requestBody = {
                name: dietPlanName,
                budget: dailyTargets.budget,
                nutrientTargets: transformNutrientData(dailyTargets),
                days: meals.map(day => {
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

            const res = await api.post('diet/save-diet-plan/', requestBody)
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }


    return (
    <>
        <button
            className="btn btn-primary"
            type="button"
            onClick={handleOnClick}
        >
            Save Diet Plan
        </button>
    </>
    )
}

export default SaveDietBtn;
