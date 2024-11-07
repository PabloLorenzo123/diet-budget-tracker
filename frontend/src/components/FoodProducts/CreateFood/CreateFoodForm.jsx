import { useState, useEffect } from "react";

import DetailsForm from "./DetailsForm";
import NutritionDataForm from "./NutritionDataForm";
import SaveBtn from "./SaveBtn";

import { nutrientState, nutrientsInformation } from "../../../lib/nutrients";
import { roundTo, isObjEmpty } from "../../../lib/functions";

import "../../../styles/foodProducts/createFoodProduct.css";

const defaultFoodData = {
  productName: "",
  productLink: "",
  servings: 1, // How many servings are in the product.
  measure: "serving", // It could be a serving, a tbspoon, an egg.
  gramWeight: "", // How many grams is a serving, this is optional. n/a for eggs for instance, grams or mililtes.
  productPrice: 0
}

const CreateFoodForm = ({showIndex, setShowIndex, showCreate, setShowCreate, selectedFood, setSelectedFood, afterSubmitFunc}) => {
  const [foodData, setFoodData] = useState(defaultFoodData);
  const [nutritionData, setNutritionData] = useState(nutrientState);

  useEffect(() => {
    // When mounted check if the form has an already selected food (a food created previously) if so update the states.
    // To have its information.
    if (selectedFood){
      if (!isObjEmpty(selectedFood)){
        const selectedFoodNutritionData = {...selectedFood.nutritionData};
        // Format the previous dictionary to follow the format in the frontend {amount, dv}.
        Object.keys(selectedFoodNutritionData).forEach(nutrient => {
          const amount = selectedFood.nutritionData[nutrient] || 0;
          const dv = roundTo(amount / nutrientsInformation[nutrient].dv * 100, 2);
          selectedFoodNutritionData[nutrient] = {amount: amount, dv: dv};
          }
        )
        // Update states.
        setFoodData(selectedFood.foodData);
        setNutritionData(selectedFoodNutritionData);
      }
    }
  }, [])

  const backToIndex = () => {
    const toIndex = () => {
      setShowCreate(false);
      setShowIndex(true);
      setSelectedFood({});
    }
    if (foodData != defaultFoodData || nutritionData != nutrientState){
      const leave = confirm("If you leave you will your unsaved changes. Are you sure you want to leave?");
      if (leave){
        toIndex();
      }
    } else {
      toIndex();
    } 
  }

  
  return (
      <div id="create-food-container">
        <h2 className="fw-bold">Create Food Product</h2>
        <p className="text-body-secondary">Create a new food product.</p>

        {setShowIndex &&
        <button type="button" className="back-to-index-btn" onClick={backToIndex}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>
          BACK TO FOOD PRODUCTS LIST
        </button>}
        
        <hr className="border border-primary border-3 opacity-75" />
        <DetailsForm
          foodData={foodData}
          setFoodData={setFoodData}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
        />
        <hr className="border border-primary border-3 opacity-75" />
        <NutritionDataForm
          foodData={foodData}
          setFoodData={setFoodData}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
        />
        <hr className="border border-primary border-3 opacity-75" />
        <SaveBtn
          foodData={foodData}
          setFoodData={setFoodData}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
          selectedFood={selectedFood}
          setSelectedFood={setSelectedFood}
          setShowIndex={setShowIndex}
          setShowCreate={setShowCreate}
          afterSubmitFunc={afterSubmitFunc}
        /> 
    </div>
  );
};

export default CreateFoodForm;
