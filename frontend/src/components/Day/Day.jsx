import { useState, useEffect, Fragment } from "react";

import GoalSetter from "./GoalSetter/GoalSetter";
import Diary from "./Diary/Diary";
import FoodSummary from "./Summary/FoodSummary";


import { dailyTargetState } from "../../lib/nutrients";

import '../../styles/diary/day.css';
import NutrientTargets from "./NutrientTargets/NutrientTargets";
import { defaultDiaryGroups, mealObjectState } from "../../constants";


const Day = () => {
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    
    const [mealNames, setMealNames] = useState(defaultDiaryGroups); // Ex: [breakfast, lunch, dinner].
    const [meals, setMeals] = useState([]); // A list of objects {foods, show}.


    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedFoodObj, setSelectedFoodObj] = useState(null);

    useEffect(() => {
        const updateMealsObject = () => {
            // Set the meals state according to the mealNames state.
            if (mealNames.length > meals.length) {
                const differeance = mealNames.length - meals.length;
                // If there were 3 meals and now a new meal name was added, add those empty arrays to the meals state.
                setMeals(prev => [...prev, ...Array.from({length: differeance}, () => {mealObjectState})])  
            } else if (mealNames.length < meals.length) {
                // Remove the excess meals.
                setMeals(prev => prev.slice(mealNames.length));
            }
        }
        updateMealsObject();
    }, [mealNames])

    useEffect(() => {
        const createMealState = () => {
            // Fetches the user custom meal names, then updates de meal state object.
            setMeals(Array.from({length: mealNames.length}, () => {mealObjectState}));
        }
        createMealState();
        console.log(meals);
    }, [])

    return (
        <>
            <main id="app">
                <div className="main-container row">

                    {/* Left side when in a large screen. */}
                    <div className="col-sm-10">
                        <div className="app-container mb-2">
                            <GoalSetter dailyTargets={dailyTargets} setDailyTargets={setDailyTargets}/>
                        </div>
                        <div className="day-container app-container mb-4">
                            <Diary
                                meals={meals}
                                setMeals={setMeals}
                                dailyTargets={dailyTargets}
                                selectedMeal={selectedMeal}
                                setSelectedMeal={setSelectedMeal}
                                selectedFoodObj={selectedFoodObj}
                                setSelectedFoodObj={setSelectedFoodObj}
                            />
                        </div>

                        <div className="food-summary-container app-container mb-4">
                            <FoodSummary
                                meals={meals}
                                dailyTargets={dailyTargets}
                                selectedMeal={selectedMeal}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>

                        <div className="nutrient-targets-container app-container">
                            <NutrientTargets
                                meals={meals}
                                dailyTargets={dailyTargets}
                                selectedMeal={selectedMeal}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>
                    </div>


                </div>
            </main> 
        </>
    )
}

export default Day;
