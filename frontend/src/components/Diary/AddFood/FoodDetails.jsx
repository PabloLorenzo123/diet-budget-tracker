import { useState, useEffect } from "react";

const FoodDetails = ({showFoodDetails, setShowFoodDetails, selectedFood}) => {
    return (
        <>
        {showFoodDetails &&
            <div className="food-details-container">
                <div className="header mb-4">
                    {selectedFood.foodData.productName}
                </div>
                <div className="body d-flex">
                    <div className="block">
                        <p><span className="fw-bold">Protein:</span> {selectedFood.nutritionData.protein}</p>
                        <p><span className="fw-bold">Net Carbs:</span> {selectedFood.nutritionData.netCarbs}</p>
                        <p><span className="fw-bold">Fat:</span> {selectedFood.nutritionData.totalFat}</p>
                    </div>
                    <div className="block">
                        <div className="row mt-2">
                            <label htmlFor="diary-group" className="col-sm-4 col-form-label fw-bold">Diary Group</label>
                            <div className="col-sm-8">
                                <select id="diary-group" className="form-control"></select>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <p className="col-sm-4 col-form-label fw-bold">Serving Size</p>
                            <div className="col-sm-4">
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="col-sm-4">
                                <select className="form-control"></select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default FoodDetails;
