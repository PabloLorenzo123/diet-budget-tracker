import { useState } from "react";
import { toast } from 'react-toastify';

import api from "../../../api";
import { isObjEmpty, flattenNutritionData } from "../../../lib/functions";

const SaveBtn = ({foodData, setFoodData, nutritionData, setNutritionData, selectedFood, setSelectedFood, setShowIndex, setShowCreate, afterSubmitFunc}) => {


    const submit = async () => {
        
        // Check that not optional fields are not empty.
        let errMsgs = [];
        if (foodData.productName == '') {
            errMsgs.push('Product name is missing.');
        }

        if (errMsgs.length > 0) {
            errMsgs.forEach(err => toast.error(err));
            return;
        }

        const flatNutritionData = flattenNutritionData(nutritionData);

        try{
            if (!selectedFood || isObjEmpty(selectedFood)){
                // Create a new food product.
                const res = await api.post("/diet/save_food/", {
                    ...foodData,
                    ...flatNutritionData
                });
                if (res.status == 201){
                    toast.success("Food product saved successfully.");
                    afterSubmitFunc();
                }
            } else {
                // Make the request.
                const res = await api.put("/diet/save_food/", {
                    ...foodData,
                    ...flatNutritionData,
                    id: selectedFood.id
                });
                if (res.status == 201){
                    toast.success("Food product updated succesfully.");
                    // Edit the selected food product.
                    selectedFood.foodData = {
                        productName: foodData.productName,
                        productLink: foodData.productLink,
                        servings: foodData.servings,
                        measure: foodData.measure,
                        gramWeight: foodData.gramWeight,
                        productPrice: foodData.productPrice
                    }
                    selectedFood.nutritionData = flatNutritionData;
                    afterSubmitFunc();
                }
            }            
        } catch (error) {
            console.log(error);
            toast.error(`There was a problem saving this food product ${error}.`);
        }
        
    }


    return (
        <div className="d-flex justify-content-end">
            <button
            type="button"
            className="btn btn-primary"
            style={{minWidth: '100px'}}
            onClick={submit}
            >
                {!selectedFood? 'Save': 'Save Changes'}
            </button>
            
        </div>
    )
}

export default SaveBtn;