import {useState, useEffect} from 'react';
import CreateFoodForm from '../../../../FoodProducts/CreateFood/CreateFoodForm';
import { calculateNutritionalContribution, roundTo } from '../../../../../lib/functions';
import { massUnits } from '../../../../../constants';

const EditFoodTab = ({selectedFood, meals, setMeals, groceries, setGroceries, foodProducts, setFoodProducts, setTab}) => {

    const afterSubmitFnc = () => {
        // Update all instances of this food in the diet plan.
        const groceriesProductFoodsArr = [];

        const transformFoods = (foods) => {
            return foods.map(food => {
                if (food.id == selectedFood.id){
                    // Update, foodData, nutritionData, then nutritionalContributions and diaryData.
                    food.foodData = selectedFood.foodData;
                    food.nutritionData = selectedFood.nutritionData;
    
                    if (!massUnits.includes(food.diaryData.servingMeasure.unit)){
                        // This means user is using the serving measure of the food product.
                        food.diaryData.servingMeasure = {
                            unit: selectedFood.foodData.measure,
                            valueInGrams: selectedFood.foodData.gramWeight,
                        }
                        // Change the portionSize accordingly.
                        food.diaryData.portionSize = food.diaryData.servings * food.diaryData.servingMeasure.valueInGrams;
                    }
                    food.diaryData.totalCost = roundTo((selectedFood.foodData.productPrice / selectedFood.foodData.servings) * food.diaryData.servings, 2);
                    food.nutritionalContribution = calculateNutritionalContribution(selectedFood, food.diaryData.portionSize);
                    groceriesProductFoodsArr.push(food);
                }
                console.log(food);
                return food;
            })
        }
        const transformMeals = (meals) => {
            return meals.map(m => {
                return {
                    ...m,
                    foods: transformFoods(m.foods),
                }
            })
        }

        setMeals(prev => {
            return prev.map(day => {
                return transformMeals(day)
            })
        })

        // Update the groceries state.
        setGroceries(prev => ({
            ...prev,
            [selectedFood.id] : {
                foodData: selectedFood.foodData,
                foods: [...groceriesProductFoodsArr]
            }
        }))
        // Update this food product in the food products list shown in the 'all' tab.
        setFoodProducts(prev => {
            return prev.map(fp => {
                if (fp.foodData.id == selectedFood.id) {
                    fp.foodData = selectedFood.foodData;
                    fp.nutritionData = selectedFood.nutritionData;
                }
                return fp
            })
        })
        // Finally set tab to 'all'.
        setTab('All');
    }

    const cancelEditing = () => {
        setTab('All');
    }

    return (
        <>
            <button className='bg-transparent border-0 m-0 p-0 d-flex justify-content-center align-items-center' onClick={cancelEditing}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>

            <div style={{height: '75%', width: '100%', padding: '10px', overflowY: 'scroll', overflowX: 'clip'}}>
                <CreateFoodForm
                    selectedFood={selectedFood}
                    showHeader={false}
                    afterSubmitFunc={afterSubmitFnc}
                />
            </div>
        </>
    )
}

export default EditFoodTab;

