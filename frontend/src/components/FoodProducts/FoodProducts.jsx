import { useState, useEffect } from "react";
import CreateFoodForm from "./CreateFood/CreateFoodForm";
import FoodProductsList from "./FoodProductsList";

import '../../styles/foodProducts/foodProducts.css'


const FoodProducts = () => {
    const [showIndex, setShowIndex] = useState(true);
    const [showCreate, setShowCreate] = useState(false);

    const [selectedFood, setSelectedFood] = useState({}); // Used for editing a food.

    const showCreateForm = () => {
        setShowIndex(false);
        setShowCreate(true);
    }

    const afterSubmitFunc = () => {
        // Function executed after pressing the submit button, and the request being successful.
        setShowCreate(false);
        setShowIndex(true);
        window.scrollTo(0, 0); 
    }

    return (
        <>
            {showIndex && (
                <FoodProductsList
                    showIndex={showIndex}
                    showCreateForm={showCreateForm}
                    setShowIndex={setShowIndex}
                    showCreate={showCreate}
                    setShowCreate={setShowCreate}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                />
            )}
            {showCreate && (
                <CreateFoodForm
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                    showCreate={showCreate}
                    setShowCreate={setShowCreate}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    afterSubmitFunc={afterSubmitFunc}
                />
            )}
        </>
    )
}

export default FoodProducts;
