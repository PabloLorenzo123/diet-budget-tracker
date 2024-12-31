import { useState, useEffect } from "react";

import { dailyTargetState } from "../../lib/nutrients";
import { massUnits } from "../../constants";

import Diet from "../Day/Diet";

import api from "../../api";
import { calculateNutritionalContribution, transformDailyTargets } from "../../lib/functions";
import LoadingSpinner from "../LoadingSpinner";

const DietPlanView = ({dietPlanId}) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    const [groceries, setGroceries] = useState({});
    const [meals, setMeals] = useState([[]]); // A list of lists (days) of objects [...{name, foods, show}] (meals).

    const [dietPlanName, setDietPlanName] = useState('');

    useEffect(() => {

        const transFormFoods = (foods, mealIdx) => {
            return foods.map(f => {
                let servingMeasure; // Serving Measure Unit
                if (f.foodData.gramWeight == f.servingMeasureInGrams){
                    // If the food product serving in grams is equal to the
                    // serving measure in grams, then the unit is the one in the food product.
                    servingMeasure = {
                        unit: f.foodData.measure,
                        valueInGrams: f.servingMeasureInGrams,
                    }
                } else {
                    // Find the unit from the default ones if it's not the one in the food product.
                    servingMeasure = massUnits.find(el => el.valueInGrams == f.servingMeasureInGrams);
                }
                const productNetContent = f.foodData.gramWeight * f.foodData.servings;
                const portionSize = f.servings * f.servingMeasureInGrams;
                const totalCost = portionSize * (f.foodData.productPrice / productNetContent);
                
                const groceriesIdx = groceries[f.id]?.foods.length > 0 ? 
                groceries[f.id].foods.length: 0;

                const food = {
                    ...f, // id, foodData, nutritionData.
                    nutritionalContribution: calculateNutritionalContribution(f, portionSize),
                    diaryData: {
                        servings: f.servings,
                        servingMeasure,
                        portionSize,
                        totalCost,
                        mealIdx,
                        groceriesIdx,
                    },
                }

                setGroceries(prev => {
                    return {
                        ...prev,
                        [food.id]: {
                            foodData: food.foodData,
                            foods: prev[foods.id] ? [...prev[foods.id].foods, food] : [food]
                        }
                    }
                })

                return food;
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
            
            try {
                setLoading(true);
                const res = await api.get(`diet/diet-plan/${dietPlanId}/`);
                if (res.status == 200){
                    const data = res.data;
                    const days = data.days;
                    const nutrientTargetsData = data.nutrientTargets;
                    
                    setDietPlanName(data.dietPlanName);
                    setMeals(transformDays(days));

                    if (nutrientTargetsData != null) {
                        setDailyTargets(() => {
                            return {
                                ...transformDailyTargets(nutrientTargetsData),
                                budget: data.budget || 0
                            }
                        })
                    } // Otherwise all the nutrients but with 0.
                }
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
            
        }

        const setup = async () => {
            try {
                setLoading(true);
                await fetchDietPlan()
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setLoading(false)
            }
        }
        
        setup();
    }, [])

    return (
    <>
        {loading?
            <LoadingSpinner />:
        isError?
            <p className="text-center">There was an error loading this diet plan.</p>
        :
        <Diet
            dailyTargets={dailyTargets}
            setDailyTargets={setDailyTargets}
            meals={meals}
            setMeals={setMeals}
            groceries={groceries}
            setGroceries={setGroceries}

            dietPlanName={dietPlanName}
            setDietPlanName={setDietPlanName}
            dietPlanId={dietPlanId}
        />
        }
            
    </>
    )
}

export default DietPlanView;
