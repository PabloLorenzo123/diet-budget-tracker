import { useState, useEffect } from "react";
import { roundTo } from "../../../../lib/functions";
import LoadingSpinner from "../../../LoadingSpinner";


const FoodsTable = ({foodProducts, selectFood, selectedFood, searchResultsHeight, foodProductsLoading, setTab, isOnMobile}) => {

    if (foodProductsLoading) {
        return <LoadingSpinner />
    }

    else if (foodProducts.length > 0 && isOnMobile){
        return (
            <>
            <p className="mb-0">Per serving.</p>
            <div className="search-results" style={{ height: searchResultsHeight }}>
                <table className="table cursor-pointer">
                <thead>
                    <tr>
                    <th>Description (<span style={{ color: '#d9534f' }}>Calories</span>, <span style={{ color: '#5cb85c' }}>Protein</span>, <span style={{ color: '#5bc0de' }}>Carbs</span>, <span style={{ color: '#f0ad4e' }}>Fat</span>)</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody className="cursor-pointer">
                    {foodProducts.map(f => {
                    return (
                        <tr key={f.id} onClick={() => selectFood(f)}>
                        <td>
                            {f.foodData.productName} <br />
                            <span style={{ color: '#d9534f' }}>{f.nutritionData.energy}kcal</span> <span style={{ color: '#5cb85c' }}>{f.nutritionData.protein}g</span> <span style={{ color: '#5bc0de' }}>{f.nutritionData.netCarbs}g</span> <span style={{ color: '#f0ad4e' }}>{f.nutritionData.totalFat}g</span>
                        </td>
                        <td>${roundTo(f.foodData.productPrice / f.foodData.servings, 2)}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            </>
        );
    }
    else if (foodProducts.length > 0 && !isOnMobile){
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
