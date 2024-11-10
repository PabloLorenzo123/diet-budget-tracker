import { useState, useEffect, Fragment } from "react";

import MealsTable from "./Diary/MealsTable";
import FoodSummary from "./Summary/FoodSummary";
import GoalSetter from "./GoalSetter/GoalSetter";

import { dailyTargetState } from "../../lib/nutrients";

import '../../styles/dairy/day.css';

const dayState = {
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
    const [meals, setMeals] = useState(dayState);
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
                            <MealsTable
                                meals={meals}
                                setMeals={setMeals}
                                selectedMeal={selectedMeal}
                                setSelectedMeal={setSelectedMeal}
                                selectedFoodObj={selectedFoodObj}
                                setSelectedFoodObj={setSelectedFoodObj}
                            />
                        </div>

                        <div className="food-summary-container app-container">
                            <FoodSummary
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
