import { useState, useEffect, Fragment } from "react";

import GoalSetter from "./GoalSetter/GoalSetter";
import Diary from "./Diary/Diary";
import FoodSummary from "./Summary/FoodSummary";


import { dailyTargetState } from "../../lib/nutrients";

import '../../styles/diary/day.css';
import NutrientTargets from "./NutrientTargets/NutrientTargets";

const mealsState = {
    uncategorized: {
        foods: [],
        show: false,
    },
    breakfast: {
        foods: [],
        show: false,
    },
    lunch: {
        foods: [],
        show: false,
    },
    dinner: {
        foods: [],
        show: false,
    },
    snacks: {
        foods: [],
        show: false,
    },
}

const Day = () => {
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    const [meals, setMeals] = useState(mealsState);
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedFoodObj, setSelectedFoodObj] = useState(null);

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
