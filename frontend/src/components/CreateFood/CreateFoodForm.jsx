import { useState, useEffect } from "react";
import '../../styles/createFoodProduct.css';
import DetailsForm from "./DetailsForm";
import NutritionDataForm from "./NutritionDataForm";
import { nutrientState } from "../../lib/nutrients";

const CreateFoodForm = () => {
    const [foodData, setFoodData] = useState({
        productName: '',
        productLink: '',
        servings: 1,    // How many servings are in the product.
        measure: 'serving', // It could be a serving, a tbspoon, an egg.
        grams: ''            // How many grams is a serving, this is optional. n/a for eggs for instance, grams or mililtes.
    });

    const [nutritionData, setNutritionData] = useState(nutrientState)

    return (
        <>
            <hr className="border border-primary border-3 opacity-75"></hr>
            <DetailsForm foodData={foodData} setFoodData={setFoodData}/>
            <hr className="border border-primary border-3 opacity-75"></hr>
            <NutritionDataForm nutritionData={nutritionData} setNutritionData={setNutritionData}/>
        </>
    )
}

export default CreateFoodForm;