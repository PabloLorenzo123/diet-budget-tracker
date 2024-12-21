import { useState, useEffect } from "react";
import CreateFoodForm from "../../../../FoodProducts/CreateFood/CreateFoodForm";

const CreateTab = ({getFoodProducts, tab, setTab}) => {

    const afterSubmitFnc = async () => {
        await getFoodProducts(); // Load the food products.
        setTab('All'); // Get back to the 'All' tabs.
    }

    return (
        <div style={{height: '75%', width: '100%', padding: '10px', overflowY: 'scroll', overflowX: 'clip'}}>
            <CreateFoodForm afterSubmitFunc={afterSubmitFnc}/>
        </div>
    )
}

export default CreateTab;
