import { useState, useEffect } from "react";
import { roundTo } from "../../../../lib/functions";
import LoadingSpinner from "../../../LoadingSpinner";


const FoodsTable = ({foodProducts, selectFood, selectedFood, searchResultsHeight, foodProductsLoading, setTab}) => {

    if (foodProductsLoading) {
        return <LoadingSpinner />
    }

    else if (foodProducts.length > 0){
        return (
            <>
            <p className="mb-0">Per serving.</p>
            <div className="search-results" style={{height: searchResultsHeight}}>
                <table className="table cursor-pointer">
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
                    <tbody className="cursor-pointer">
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
        )
    } else {
        return (
            <>
                <p>Nothing Here.</p>
                <p>You can create your Food Products in the 
                    <a onClick={() => setTab('Create')}> create </a> 
                tab.</p>
            </>
        )
    }

    
}

export default FoodsTable;
