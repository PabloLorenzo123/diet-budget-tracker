import { useState, useEffect } from "react";
import '../../styles/createFoodProduct.css';
import DetailsForm from "./DetailsForm";
import NutritionDataForm from "./NutritionDataForm";
import { nutrients } from "../../lib/nutrients";

const CreateFoodForm = () => {
    const [foodData, setFoodData] = useState({
        productName: '',
        productLink: '',
        servings: 1,
        servingUnit: 'Grams', // Grams or mililiters.
        servingSize: 1
    });

    const [nutritionData, setNutritionData] = useState(nutrients)

    return (
        <>
            <hr className="border border-primary border-3 opacity-75"></hr>
            <DetailsForm foodData={foodData} setFoodData={setFoodData}/>
            <hr className="border border-primary border-3 opacity-75"></hr>
            <NutritionDataForm />
        </>
    )
}

export default CreateFoodForm;