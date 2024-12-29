import { useState, useEffect } from "react";
import { titleCase, isObjEmpty, validateDecimalNumberInput } from "../../../../../lib/functions";

import { massUnits } from "../../../../../constants";
import AddToDiaryBtn from "../AddToDiaryBtn";
import FoodDetailsTargets from "./FoodDetailsTargets";
import FoodOptions from "./FoodOptions";

const FoodDetailsForm = ({showModal, setShowModal, selectedFood, setSelectedFood, meals,
     setMeals, currentDay, groceries, setGroceries, dailyTargets, setTab, foodProducts, setFoodProducts, unselectFoodP, isOnMobile, setShowFoodDetails}) => {

    const [addToDiaryForm, setAddToDairyForm] = useState({
        diaryGroup: 0, // A.K.A What meal object.
        servings: 1,
        servingMeasure: {},
        servingMeasures: massUnits,
    })

    useEffect(() => {
        // Each time the selectedFood changes, add its serving measures to the form options.
        if (!isObjEmpty(selectedFood)){
            const selectedFoodSM = {
                unit: selectedFood.foodData.measure,
                valueInGrams: selectedFood.foodData.gramWeight
            }
            const newServingMeasures = [
                selectedFoodSM, // Plus the serving meausre of this foodproduct.
                ...massUnits, // The default serving measures.
            ];

            setAddToDairyForm(prev => ({
                ...prev,
                servingMeasure: selectedFoodSM,
                servingMeasures: newServingMeasures
            }))
        }
    }, [selectedFood])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddToDairyForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeSM = (e) => {
        // Handle change for the serving measure field.
        const value = e.target.value;
        const sm = addToDiaryForm.servingMeasures.find(item => item.unit == value);
        setAddToDairyForm(prev => ({
            ...prev,
            servingMeasure: sm 
        }))
    }
    
    const exit = () => {
        setShowFoodDetails(false);
        setSelectedFood({});
        
    }

    
    return (
        <>
        <div className="container-fluid py-2 mt-2">
            {isOnMobile &&
                <button className="bg-transparent p-0 border-0 m-0" onClick={exit}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            }
            {/* Header product name */}
            <div className="mb-1 fw-bold d-flex align-items-center justify-content-center">
                <span className="me-2">{selectedFood.foodData.productName}</span>
                {/* Options */}
                <FoodOptions 
                    selectedFood={selectedFood}
                    setTab={setTab}
                    foodProducts={foodProducts}
                    setFoodProducts={setFoodProducts}
                    setSelectedFood={setSelectedFood}
                    meals={meals}
                    setMeals={setMeals}
                    groceries={groceries}
                    setGroceries={setGroceries}
                    unselectFoodP={unselectFoodP}
                />
            </div>
            {/* Blocks */}
            <div className="row mb-2 d-flex justify-content-around">
                {/* Left block calories, protein, carbs, fat */}
                <div className="col-sm-6 p-2 border">
                    <FoodDetailsTargets 
                        meals={meals}
                        dailyTargets={dailyTargets}
                        selectedFood={selectedFood}
                        addToDiaryForm={addToDiaryForm}
                    />
                </div>
                {/* Right block (Add to Diary form) */}
                <div className="col-sm-5 p-2 border">
                    <div className="mt-4">
                        <div className="row mt-2">
                            <label htmlFor="diaryGroup" className="col-sm-4 col-form-label fw-bold">Diary Group</label>
                            <div className="col-sm-8">
                                {/* Select meal */}
                                <select
                                    id="diaryGroup"
                                    className="form-select"
                                    onChange={handleChange}
                                    name="diaryGroup"
                                    value={addToDiaryForm.diaryGroup}
                                >
                                    {meals[currentDay].map((meal, idx) => {
                                        if (!meal) return; // If undefined then don't show.
                                        if (meal.hideFromDiary) return; // If hidden don't show.
                                        return <option key={idx} value={idx}>{titleCase(meal.name)}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <p className="col-sm-4 col-form-label fw-bold">Serving Size</p>
                            <div className="col-sm-2">
                                {/* Number of servings */}
                                <input
                                    type="text"
                                    className="form-control"
                                    inputMode="decimal" // Enables numeric keypad on mobile  
                                    onChange={handleChange}
                                    onInput={e => validateDecimalNumberInput(e, 0)}
                                    name="servings"
                                    value={addToDiaryForm.servings}
                                />
                            </div>
                            <div className="col-sm-6">
                                {/* Serving measures */}
                                <select
                                    className="form-select"
                                    value={addToDiaryForm.servingMeasure.unit}
                                    onChange={handleChangeSM}>
                                    {addToDiaryForm.servingMeasures.map(sm => {
                                        return (
                                            <option key={sm.unit} value={sm.unit}>
                                                {sm.unit}{sm.valueInGrams != 1? ` - ${sm.valueInGrams}g`: ''}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <AddToDiaryBtn
                    meals={meals}
                    setMeals={setMeals}
                    currentDay={currentDay}
                    groceries={groceries}
                    setGroceries={setGroceries}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    addToDiaryForm={addToDiaryForm}
                    setAddToDiaryForm={setAddToDairyForm}
                />
            </div>
            
        </div>
        </>
    )
}

export default FoodDetailsForm;
