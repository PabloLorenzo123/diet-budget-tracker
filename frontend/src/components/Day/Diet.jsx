import { useState, useEffect, Fragment } from "react";

import GoalSetter from "./GoalSetter/GoalSetter";
import Diary from "./Diary/Diary";
import FoodSummary from "./Summary/FoodSummary";

import '../../styles/diary/day.css';
import NutrientTargets from "./NutrientTargets/NutrientTargets";

import { defaultDiaryGroupObject, defaultDiaryGroups, maxNumberOfMeals, navbarZIndex } from "../../constants";

import api from "../../api";
import DaySwitcher from "./DaySwitcher";
import GroceryHaul from "./GroceryHaul/GroceryHaul";
import DietSummary from "./DietSummary/DietSummary";


const Diet = ({dailyTargets, setDailyTargets, meals, setMeals, groceries, setGroceries, dietPlanName, setDietPlanName, dietPlanId}) => {
    
    const [currentDay, setCurrentDay] = useState(0);
    const [selectedMealIdx, setSelectedMealIdx] = useState(null);
    const [selectedFoodObj, setSelectedFoodObj] = useState(null);

    const [rightColumZIndex, setRightColumnIndex] = useState(1);

    const showOrHideRightColumn = (showModal) => {
        // Because the right column has a position of 'sticky'.
        // The stacking context is different here and the modal will appear beneath the navbar.
        // Because of the position of sticky a zIndex value is mandatory, and this one should be higher.
        // Than the navbars zIndex when a modal inside the right column appears.
        // In the other hand the zIndex of the right column should be lower thant the navbars when a modal is not shown.
        // In the right column.
        showModal? setRightColumnIndex(navbarZIndex + 1): setRightColumnIndex(1);
    }

    return (
        <>
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
                    <div className="position-sticky" style={{top: '70px', zIndex: rightColumZIndex}}>
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
                                showOrHideRightColumn={showOrHideRightColumn}
                            />
                        </div>

                        <div className="app-container">
                            <DietSummary
                                meals={meals}
                                dailyTargets={dailyTargets}
                                dietPlanName={dietPlanName}
                                setDietPlanName={setDietPlanName}
                                dietPlanId={dietPlanId}
                                showOrHideRightColumn={showOrHideRightColumn}
                            />
                        </div>
                    </div>
                    
                </div>


            </div>
        </>
    )
}

export default Diet;
