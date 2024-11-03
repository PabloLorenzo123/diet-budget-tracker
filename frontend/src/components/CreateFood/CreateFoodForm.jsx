import { useState, useEffect } from "react";
import "../../styles/createFoodProduct.css";
import DetailsForm from "./DetailsForm";
import NutritionDataForm from "./NutritionDataForm";
import SaveBtn from "./SaveBtn";
import { nutrientState } from "../../lib/nutrients";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateFoodForm = () => {
  const [foodData, setFoodData] = useState({
    productName: "",
    productLink: "",
    servings: 1, // How many servings are in the product.
    measure: "serving", // It could be a serving, a tbspoon, an egg.
    gramWeight: "", // How many grams is a serving, this is optional. n/a for eggs for instance, grams or mililtes.
    productPrice: 0
  });

  const [nutritionData, setNutritionData] = useState(nutrientState);
  
  return (
    <>
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
      <SaveBtn foodData={foodData} setFoodData={setFoodData} nutritionData={nutritionData} setNutritionData={setNutritionData}/>
      <ToastContainer position="top-center"/>
    </>
  );
};

export default CreateFoodForm;
