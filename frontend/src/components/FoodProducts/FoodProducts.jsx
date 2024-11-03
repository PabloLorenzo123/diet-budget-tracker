import { useState, useEffect } from "react";
import CreateFoodForm from "./CreateFood/CreateFoodForm";
import FoodProductsList from "./foodProductsList";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/foodProducts/foodProducts.css'


const FoodProducts = () => {
    const [showIndex, setShowIndex] = useState(true);
    const [showCreate, setShowCreate] = useState(false);

    const [selectedFood, setSelectedFood] = useState({}); // Use for editing a food.

    const showCreateForm = () => {
        setShowIndex(false);
        setShowCreate(true);
    }

    return (
        <div>
            <main id="app">
                {showIndex &&
                    <>
                        <h2 className="fw-bold">Food Products</h2>
                        <p className="lead">Create a new food product from the information of a local supermarket. </p>
                        <div className="mt-2 border border-black rounded-3 food-products-container">
                            <button type="button" className="add-food-btn" onClick={showCreateForm}>
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                ADD FOOD PRODUCT
                            </button>
                            <hr className="mt-4"/>
                            <FoodProductsList
                                showIndex={showIndex}
                                setShowIndex={setShowIndex}
                                showCreate={showCreate}
                                setShowCreate={setShowCreate}
                                selectedFood={selectedFood}
                                setSelectedFood={setSelectedFood}
                            />
                        </div>
                    </>
                }
                {
                    showCreate &&
                    <CreateFoodForm
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                    showCreate={showCreate}
                    setShowCreate={setShowCreate}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    />
                }
            </main>
            <ToastContainer position="top-center"/>
        </div>
    )
}

export default FoodProducts;
