import { useState, useEffect, Fragment } from "react";

import GoalSetter from "./GoalSetter/GoalSetter";
import Diary from "./Diary/Diary";
import FoodSummary from "./Summary/FoodSummary";


import { dailyTargetState } from "../../lib/nutrients";

import '../../styles/diary/day.css';
import NutrientTargets from "./NutrientTargets/NutrientTargets";

import { defaultDiaryGroupObject, defaultDiaryGroups, maxNumberOfMeals } from "../../constants";

import api from "../../api";
import DaySwitcher from "./DaySwitcher";


const Diet = () => {
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    
    const [days, setDays] = useState([]) // A list of lists of meals objects.
    const [currentDay, setCurrentDay] = useState(0);

    const [meals, setMeals] = useState([]); // A list of objects [...{name, foods, show}].


    const [selectedMealIdx, setSelectedMealIdx] = useState(null);
    const [selectedFoodObj, setSelectedFoodObj] = useState(null);
    
    useEffect(() => {
        const populateMealsState = async () => {
            try {
                const res = await api.get('auth/diary_settings/meals/');
                const resData = res.data;
                if (res.status == 200){
                    const mealsSettings = resData.mealsSettings;
                    setMeals(() => {
                        if (mealsSettings.length > 0) {
                            return resData.mealsSettings.map(meal => ({...defaultDiaryGroupObject, ...meal}));
                        }
                        return defaultDiaryGroups
                    })
                }
            } catch (error) {
                setMeals(defaultDiaryGroups);
                console.log(error);
            }
        }
        populateMealsState();
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
                                selectedMealIdx={selectedMealIdx}
                                setSelectedMealIdx={setSelectedMealIdx}
                                selectedFoodObj={selectedFoodObj}
                                setSelectedFoodObj={setSelectedFoodObj}
                            />
                        </div>

                        
                        <div className="food-summary-container app-container mb-4">
                            <FoodSummary
                                meals={meals}
                                dailyTargets={dailyTargets}
                                selectedMealIdx={selectedMealIdx}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>
                        
                        <div className="nutrient-targets-container app-container">
                            <NutrientTargets
                                meals={meals}
                                dailyTargets={dailyTargets}
                                selectedMealIdx={selectedMealIdx}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>
                    </div>

                    {/* Right side when in large screen */}
                    <div className="col-sm-2">
                        <div className="app-container sticky-sm-top">
                            <DaySwitcher
                                currentDay={currentDay}
                                setCurrentDay={setCurrentDay}
                            />
                        </div>
                    </div>


                </div>
            </main> 
        </>
    )
}

export default Diet;
