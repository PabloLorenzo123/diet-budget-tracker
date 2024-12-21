import { useState, useEffect } from "react";

const FoodOptions = ({selectedFood, setTab}) => {

    const editFood = () => {
        setTab('Edit');
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

            <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center me-2" >
                <span className="material-symbols-outlined">
                    delete_forever
                </span>
            </button>

        </div>
    )
}

export default FoodOptions;
