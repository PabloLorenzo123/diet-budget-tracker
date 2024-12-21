import {useState, useEffect} from 'react';
import CreateFoodForm from '../../../../FoodProducts/CreateFood/CreateFoodForm';

const EditFoodTab = ({selectedFood}) => {

    const afterSubmitFnc = () => {
        // Update all instances of this food in the diet plan.
    }

    return (
        <>
            <div style={{height: '75%', width: '100%', padding: '10px', overflowY: 'scroll', overflowX: 'clip'}}>
                <CreateFoodForm
                    selectedFood={selectedFood}
                    showHeader={false}
                />
            </div>
        </>
    )
}

export default EditFoodTab;

