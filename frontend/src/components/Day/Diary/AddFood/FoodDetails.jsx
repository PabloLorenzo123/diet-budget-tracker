import { useState, useEffect } from "react";
import { titleCase, isObjEmpty, validateDecimalNumberInput } from "../../../../lib/functions";

import { servingMeasures } from "../../../../constants";
import AddToDiaryBtn from "./AddToDiaryBtn";

const FoodDetails = ({showModal, setShowModal, showFoodDetails, setShowFoodDetails, selectedFood, setSelectedFood, meals, setMeals}) => {
    const [addToDairyForm, setAddToDairyForm] = useState({
        diaryGroup: 'uncategorized',
        servings: 1,
        servingMeasure: {},
        servingMeasures: servingMeasures,
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddToDairyForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeSM = (e) => {
        // Handle change for the serving measure field.
        const {name, value} = e.target;
        const sm = addToDairyForm.servingMeasures.find(item => item.unit == value);
        setAddToDairyForm(prev => ({
            ...prev,
            servingMeasure: sm 
        }))
    }

    useEffect(() => {
        // Each time the selectedFood changes, add its serving measures to the form options.
        if (!isObjEmpty(selectedFood)){
            const newServingMeasures = [{unit: selectedFood.foodData.measure, valueInGrams: selectedFood.foodData.gramWeight}, ...servingMeasures];
            setAddToDairyForm(prev => ({
                ...prev,
                servingMeasure: newServingMeasures[0],
                servingMeasures: newServingMeasures
            }))
        }
        
    }, [selectedFood])

    return (
        <>
        {showFoodDetails &&
            <div className="food-details-container">
                <div className="header mb-4">
                    {selectedFood.foodData.productName}
                </div>
                <div className="body d-flex mb-2">
                    {/* Left block calories, protein, carbs, fat */}
                    <div className="block">
                        <p><span className="fw-bold">Calories:</span> {selectedFood.nutritionData.energy}kcal</p>
                        <p><span className="fw-bold">Protein:</span> {selectedFood.nutritionData.protein}g</p>
                        <p><span className="fw-bold">Net Carbs:</span> {selectedFood.nutritionData.netCarbs}g</p>
                        <p><span className="fw-bold">Fat:</span> {selectedFood.nutritionData.totalFat}g</p>
                    </div>
                    <div className="block">
                        <div className="row mt-2">
                            <label htmlFor="diaryGroup" className="col-sm-4 col-form-label fw-bold">Diary Group</label>
                            <div className="col-sm-8">
                                <select
                                id="diaryGroup"
                                className="form-control"
                                onChange={handleChange}
                                name="diaryGroup"
                                value={addToDairyForm.diaryGroup}
                                >
                                    {Object.keys(meals).map(meal => {
                                        return <option key={meal} value={meal}>{titleCase(meal)}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <p className="col-sm-4 col-form-label fw-bold">Serving Size</p>
                            <div className="col-sm-2">
                                <input
                                type="text"
                                className="form-control"
                                inputMode="decimal" // Enables numeric keypad on mobile  
                                onChange={handleChange}
                                onInput={e => validateDecimalNumberInput(e, 0)}
                                name="servings"
                                value={addToDairyForm.servings}
                                />
                            </div>
                            <div className="col-sm-6">
                                <select
                                className="form-control"
                                value={addToDairyForm.servingMeasure.unit}
                                onChange={handleChangeSM}>
                                    {addToDairyForm.servingMeasures.map(sm => {
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
                <AddToDiaryBtn
                    meals={meals}
                    setMeals={setMeals}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    addToDiaryForm={addToDairyForm}
                    setAddToDiaryForm={setAddToDairyForm}
                />
            </div>
        }
        </>
    )
}

export default FoodDetails;
