import NavBar from '../components/NavBar';
import Diet from '../components/Day/Diet';
import LoadingSpinner from '../components/LoadingSpinner'

import { dailyTargetState, nutrientsInformation } from "../lib/nutrients";
import { defaultDiaryGroups, defaultDiaryGroupObject } from '../constants';

import { roundTo, transformDailyTargets } from '../lib/functions';

import '../styles/index.css';
import { useState, useEffect } from 'react';

import api from '../api';
import { toast } from 'react-toastify';

const Index = () => {
    const [loading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false);
    
    const [dailyTargets, setDailyTargets] = useState(dailyTargetState)
    const [groceries, setGroceries] = useState({});
    const [meals, setMeals] = useState([[]]); // A list of lists (days) of objects [...{name, foods, show}] (meals).
   
    const [dietPlanName, setDietPlanName] = useState('');
    /**
     * Structure of the Meal Data:
     * 
     * [
     *  [
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
     *         nutritionalContribution: {
     *           // Same structure as nutritionData; provides contribution values
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
     *   }....
     *  ]...
     * ]
     */

    useEffect(() => {
        const populateMealsState = async () => {
            try {
                const res = await api.get('auth/diary_settings/meals/');
                const resData = res.data;
                if (res.status == 200){
                    const mealsSettings = resData.mealsSettings;
                    setMeals((prev) => {
                        return prev.map((day, dayIndex) => {
                            if (mealsSettings.length > 0) {
                                return resData.mealsSettings.map(meal => ({...defaultDiaryGroupObject, ...meal}));
                            }
                            return defaultDiaryGroups
                        })
                    })
                }
            } catch (error) {
                setMeals(prev => prev.map(_ => defaultDiaryGroups));
                console.log(error);
            }
        }

        const getDailyTargets = async () => {
            try {
                const res = await api.get('auth/diary_settings/daily_targets/');
                if (res.status == 200){
                    setDailyTargets(transformDailyTargets(res.data.dailyTargets));
                }
            } catch (error) {
                console.log(`Could not retrieve user's daily targets. ${error}`);
            }
        }

        const setup = async () => {
            try {
                setIsLoading(true);
                await Promise.all([populateMealsState(), getDailyTargets()]);
            } catch (error) {
                console.error("Error during setup:", error);
                setIsError(true);
                toast.error("There was an error setting up your data. Please try again.");
                // Handle errors here, e.g., display an error message
            } finally {
                setIsLoading(false);
            }
        }

        setup();
        
    }, [])

    if (loading) {
        return <LoadingSpinner />
    } else if (isError) {
        return <p className='text-center'>There was an error loading your data, please try again.</p>
    } else {
        return(
            <Diet
                dailyTargets={dailyTargets}
                setDailyTargets={setDailyTargets}
                meals={meals}
                setMeals={setMeals}
                groceries={groceries}
                setGroceries={setGroceries}
                dietPlanName={dietPlanName}
                setDietPlanName={setDietPlanName}
            />
        )
    }
}

export default Index