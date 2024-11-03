import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";

const SaveBtn = ({foodData, setFoodData, nutritionData, setNutritionData}) => {
    
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
        console.log(flatNutritionData);
        try{
            const res = await api.post("/diet/save_food/", {
                ...foodData,
                ...flatNutritionData
            });
            if (res.status == 200){
                toast.success("Food product saved succesfully.");
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
            style={{width: '100px'}}
            onClick={submit}
            >
            Save
            </button>
            
        </div>
    )
}

export default SaveBtn;