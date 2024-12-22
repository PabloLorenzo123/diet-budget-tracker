import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../../../api";

const FoodOptions = ({selectedFood, setTab, foodProducts, setFoodProducts, setSelectedFood,
    meals, setMeals, groceries, setGroceries, unselectFoodP}) => {

    const editFood = () => {
        setTab('Edit');
    }

    const deleteFood = async (e, food) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete ${food.foodData.productName}?`)){
            try {
                const res = await api.delete(`diet/food_product/${food.id}/`);
                if (res.status == 200){
                    toast.success("Food product deleted.");
                    const newFoodProducts = foodProducts.filter(f => f.id != food.id);

                    // Remove this food product from the dietplan.
                    setMeals(prev => {
                        return prev.map(day => {
                            return day.map(meal => {
                                return {
                                    ...meal,
                                    foods: meal.foods.filter(f => f.id != food.id) // Remove this food.
                                }
                            })
                        })
                    })

                    // Remove this food product from the groceries.
                    setGroceries(prev => {
                        // Delete the key corresponding to this food product.
                        const copy = {...prev}
                        delete copy[food.id];
                        return copy;
                    })

                    setFoodProducts(newFoodProducts);
                    
                    // Unselect selected food.
                    unselectFoodP();
                }
            } catch (error) {
                toast.error(`There was a problem deleting this food product ${error}`);
            }
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            {/* Open link in new tab button */}
            {selectedFood.foodData.productLink && 
            <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center me-2">
                <span className="material-symbols-outlined">
                        <a href={selectedFood.foodData.productLink} target="_blank" className="text-decoration-none text-body">
                            open_in_new
                        </a>
                </span>
            </button>}

            <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center me-2" onClick={editFood}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </button>

            <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center me-2" onClick={e => deleteFood(e, selectedFood)}>
                <span className="material-symbols-outlined">
                    delete_forever
                </span>
            </button>

        </div>
    )
}

export default FoodOptions;
