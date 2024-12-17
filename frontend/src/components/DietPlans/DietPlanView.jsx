import { useState, useEffect } from "react";

import { dailyTargetState } from "../../lib/nutrients";
import { servingMeasures } from "../../constants";

import Diet from "../Day/Diet";

import api from "../../api";
import { calculateNutritionalContribution, transformDailyTargets } from "../../lib/functions";

const DietPlanView = ({dietPlanId}) => {
    const [loading, setLoading] = useState(true);
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    const [groceries, setGroceries] = useState({});
    const [meals, setMeals] = useState([[]]); // A list of lists (days) of objects [...{name, foods, show}] (meals).

    useEffect(() => {

        const transFormFoods = (foods, mealIdx) => {
            return foods.map(f => {
                let smUnit = ''; // Serving Measure Unit
                if (f.foodData.gramWeight == f.servingMeasureInGrams){
                    // If the food product serving in grams is equal to the
                    // serving measure in grams, then the unit is the one in the food product.
                    smUnit = f.foodData.measure
                } else {
                    // Find the unit from the default ones if it's not the one in the food product.
                    smUnit = servingMeasures.find(el => el.valueInGrams == f.servingMeasureInGrams)
                }
                const portionSize = f.servings * f.servingMeasureInGrams;
                const totalCost = portionSize * f.foodData.productPrice / f.foodData.gramWeight;
                
                const groceriesIdx = groceries[f.id]?.foods.length > 0 ? 
                groceries[f.id].foods.length: 0;

                return {
                    ...f, // id, foodData, nutritionData.
                    nutritionalContribution: calculateNutritionalContribution(f, portionSize),
                    diaryData: {
                        servings: f.servings,
                        servingMeasure: {
                            unit: smUnit,
                            valueInGrams: f.servingMeasureInGrams,
                        },
                        portionSize,
                        totalCost,
                        mealIdx,
                        groceriesIdx,
                    },
                }
            })
        }

        const transformDays = (days) => {
            // Transform the data to fit the data structure of the meal state.
            return days.map(day => {
                const meals = day.meals;
                return meals.map((m, idx) => {
                    return {
                        name: m.name,
                        foods: transFormFoods(m.foods, idx),
                        show: true,
                        hideFromDiary: false
                    }
                })
            })
        }

        const fetchDietPlan = async () => {
            setLoading(true);
            try {
                const res = await api.get(`diet/diet-plan/${dietPlanId}/`);
                if (res.status == 200){
                    const data = res.data;
                    const days = data.days;
                    const nutrientTargetsData = data.nutrientTargets;
                    setMeals(transformDays(days))
                    if (nutrientTargetsData) {
                        setDailyTargets(transformDailyTargets(nutrientTargetsData))
                    } // Otherwise all the nutrients but with 0.
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
            
        }
        fetchDietPlan();
    }, [])

    return (
    <>
            <Diet
                dailyTargets={dailyTargets}
                setDailyTargets={setDailyTargets}
                meals={meals}
                setMeals={setMeals}
                groceries={groceries}
                setGroceries={setGroceries}
            />
    </>
    )
}

export default DietPlanView;
