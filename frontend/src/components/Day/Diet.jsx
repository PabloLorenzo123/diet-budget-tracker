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
    /**
     * Structure of the Meal Data:
     * 
     * [
     *   {
     *     name: string,             // Name of the meal (e.g., "breakfast", "lunch", "dinner", "snacks")
     *     foods: [                  // Array of food items included in the meal
     *       {
     *         id: string,           // Unique identifier for the food item
     *         foodData: {           // Information about the food product
     *           productName: string,  // Name of the food product
     *           productLink: string,  // URL link to the product
     *           servings: number,    // Number of servings
     *           measure: string,     // Serving measurement unit
     *           gramWeight: string,  // Weight of one serving in grams
     *           productPrice: number // Price of the product in local currency
     *         },
     *         nutritionData: {      // Nutritional information for one serving
     *           energy: number,     // Energy in kcal
     *           protein: number,    // Protein in grams
     *           fiber: number,      // Fiber in grams
     *           starch: number,     // Starch in grams
     *           sugars: number,     // Sugars in grams
     *           addedSugars: number,// Added sugars in grams
     *           netCarbs: number,   // Net carbohydrates in grams
     *           monounsaturatedFat: number, // Monounsaturated fat in grams
     *           polyunsaturatedFat: number, // Polyunsaturated fat in grams
     *           saturatedFat: number,      // Saturated fat in grams
     *           transFat: number,          // Trans fat in grams
     *           cholesterol: number,       // Cholesterol in mg
     *           totalFat: number,          // Total fat in grams
     *           B1: number, B2: number, B3: number, // Vitamins B1, B2, and B3 in mg
     *           B5: number, B6: number, B12: number, // Vitamins B5, B6, and B12 in mg
     *           choline: number, folate: number,     // Choline and folate in mcg
     *           A: number, C: number, D: number,     // Vitamins A, C, and D in mcg
     *           E: number, K: number,               // Vitamins E and K in mcg
     *           calcium: number,                    // Calcium in mg
     *           chromium: number,                   // Chromium in mcg
     *           copper: number,                     // Copper in mg
     *           iron: number,                       // Iron in mg
     *           magnesium: number,                  // Magnesium in mg
     *           manganese: number,                  // Manganese in mg
     *           molybdenum: number,                 // Molybdenum in mcg
     *           phosphorus: number,                 // Phosphorus in mg
     *           potassium: number,                  // Potassium in mg
     *           selenium: number,                   // Selenium in mcg
     *           sodium: number,                     // Sodium in mg
     *           zinc: number                        // Zinc in mg
     *         },
     *         nutritionalContribution: { // Same structure as nutritionData; provides contribution values
     *           // See nutritionData fields
     *         },
     *         diaryData: {            // Additional data for diary entries
     *           servings: number,     // Number of servings
     *           servingMeasure: {     // Measurement unit and weight
     *             unit: string,       // Unit of measurement
     *             valueInGrams: string // Weight in grams
     *           },
     *           portionSize: number,  // Portion size in grams
     *           totalCost: number,    // Total cost of the food item
     *           mealIdx: number | string, // Index of the meal in the array
     *           groceriesIdx: number  // Index of the item in the groceries list
     *         }
     *       }
     *     ],
     *     show: boolean,              // Whether the meal is visible
     *     hideFromDiary: boolean      // Whether the meal is hidden from the diary
     *   }
     * ]
     */


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
                                    dailyTargets={dailyTargets}
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
