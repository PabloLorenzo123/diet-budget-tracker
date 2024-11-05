import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../../../api";
import { isObjEmpty } from "../../../lib/functions";

const SaveBtn = ({foodData, setFoodData, nutritionData, setNutritionData, selectedFood, setSelectedFood, setShowIndex, setShowCreate, afterSubmitFunc}) => {
    
    const submit = async () => {
        
        // Check that not optional fields are not empty.
        let errMsgs = [];
        if (foodData.productName == '') {
            errMsgs.push('Product name is missing.');
        }
        if (!foodData.productPrice) {
            errMsgs.push('Product price is missing.');
        }
        if (errMsgs.length > 0) {
            errMsgs.forEach(err => toast.error(err));
        }

        const flatNutritionData = {...nutritionData}
        Object.keys(flatNutritionData).forEach(nutrient => {
            flatNutritionData[nutrient] = nutritionData[nutrient].amount;
        })
        // console.log(flatNutritionData);

        try{
            if (!selectedFood || isObjEmpty(selectedFood)){
                // Create a new food product.
                const res = await api.post("/diet/save_food/", {
                    ...foodData,
                    ...flatNutritionData
                });
                if (res.status == 201){
                    toast.success("Food product saved succesfully.");
                    afterSubmitFunc();
                }
            } else {
                // Edit the selected food product.
                const res = await api.put("/diet/save_food/", {
                    ...foodData,
                    ...flatNutritionData,
                    id: selectedFood.id
                });
                if (res.status == 201){
                    toast.success("Food product updated succesfully.");
                    afterSubmitFunc();
                }
            }            
        } catch (error) {
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
            {selectedFood && isObjEmpty(selectedFood)? 'Save': 'Save Changes'}
            </button>
            
        </div>
    )
}

export default SaveBtn;