import { useState, useEffect } from "react";
import { roundTo } from "../../../../lib/functions";


const FoodsTable = ({foodProducts, selectFood, selectedFood, searchResultsHeight, foodProductsLoading}) => {

    
    return (
        <>
        {
        foodProductsLoading?
        <>
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </>
        :foodProducts.length?
            <>
            <p className="mb-0">Per serving.</p>
            <div className="search-results" style={{height: searchResultsHeight}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Calories</th>
                            <th>Protein</th>
                            <th>Carbs</th>
                            <th>Fat</th>
                            <th>Price</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {foodProducts.map(f => {
                            return (
                                <tr key={f.id} className={f == selectedFood? 'selected': ''} onClick={() => selectFood(f)} >
                                    <td>{f.foodData.productName}</td>
                                    <td>{f.nutritionData.energy}kcal</td>
                                    <td>{f.nutritionData.protein}g</td>
                                    <td>{f.nutritionData.netCarbs}g</td>
                                    <td>{f.nutritionData.totalFat}g</td>
                                    <td>${roundTo(f.foodData.productPrice / f.foodData.servings, 2)}</td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            </>
            :
            <p>Nothing here.</p>
            }
        </>
    )
}

export default FoodsTable;
