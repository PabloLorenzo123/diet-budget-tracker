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
import GroceryHaul from "./GroceryHaul";
import DietSummary from "./DietSummary/DietSummary";


const Diet = () => {
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    
    const [currentDay, setCurrentDay] = useState(0);
    const [groceries, setGroceries] = useState({});
    // object of products ids = {foodData: {gramWeight, measure, productLink, productName, productPrice, servings}, foods: []}
    const [meals, setMeals] = useState([[]]); // A list of lists (days) of objects [...{name, foods, show}] (meals).


    const [selectedMealIdx, setSelectedMealIdx] = useState(null);
    const [selectedFoodObj, setSelectedFoodObj] = useState(null);
    
    useEffect(() => {
        const populateMealsState = async () => {
            try {
                const res = await api.get('auth/diary_settings/meals/');
                const resData = res.data;
                if (res.status == 200){
                    const mealsSettings = resData.mealsSettings;
                    setMeals((prev) => {
                        return prev.map((day, dayIndex) => {
                            if (dayIndex == currentDay){
                                if (mealsSettings.length > 0) {
                                    return resData.mealsSettings.map(meal => ({...defaultDiaryGroupObject, ...meal}));
                                }
                                return defaultDiaryGroups
                            }
                            return day;
                        })
                    })
                }
            } catch (error) {
                setMeals(prev => prev.map(_ => defaultDiaryGroups));
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
                    <div className="col-sm-9">
                        <div className="app-container mb-2">
                            <GoalSetter
                                dailyTargets={dailyTargets}
                                setDailyTargets={setDailyTargets}
                            />
                        </div>
                        <div className="day-container app-container mb-4">
                            <Diary
                                meals={meals}
                                setMeals={setMeals}
                                currentDay={currentDay}
                                groceries={groceries}
                                setGroceries={setGroceries}
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
                                currentDay={currentDay}
                                dailyTargets={dailyTargets}
                                selectedMealIdx={selectedMealIdx}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>
                        
                        <div className="nutrient-targets-container app-container mb-2">
                            <NutrientTargets
                                meals={meals}
                                currentDay={currentDay}
                                dailyTargets={dailyTargets}
                                selectedMealIdx={selectedMealIdx}
                                selectedFoodObj={selectedFoodObj}
                            />
                        </div>
                    </div>

                    {/* Right side when in large screen */}
                    <div className="col-sm-3">
                        <div className="sticky-sm-top">
                            <div className="app-container mb-2">
                                <DaySwitcher
                                    meals={meals}
                                    setMeals={setMeals}
                                    currentDay={currentDay}
                                    setCurrentDay={setCurrentDay}
                                />
                            </div>

                            <div className="app-container mb-2">
                                <GroceryHaul
                                    groceries={groceries}
                                />
                            </div>

                            <div className="app-container">
                                <DietSummary
                                    meals={meals}
                                    dailyTargetState={dailyTargetState}
                                />
                            </div>
                        </div>
                        
                    </div>


                </div>
            </main> 
        </>
    )
}

export default Diet;
