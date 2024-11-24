import { useState, useEffect, Fragment } from "react";
import { roundTo } from "../../lib/functions";

const GroceryHaul = ({groceries}) => {
    // How the grocery works.
    // There's a grocery state which is an object where each key is the id of a product. and the value is {name: '', foods: []}
    // When a product is added to the diary via AddFoodBtn.jsx the product is added to the foods ^ array, and inside that food object.
    // it has a diaryData property which has a groceriesIdx property that indicates the index of this food product in the grocery foods array.
    // This food object is also added to the meals table, such that when the servings, serving size is updated the grocery state can be updated as well.
    // When the food object is deleted from the meals state its index in the groceries foods array is set to undefined, instead of removing.
    // the element from the array.

    // Show the products which have food items in the diary, otherwise don't show.
    const products = Object.keys(groceries).map(prodId => groceries[prodId]).filter(p => p.foods.some(f => f));

    let groceriesTotalCost = 0

    return (
    <>
        <h5>Groceries</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>$</th>
                </tr>
            </thead>
                
            <tbody>
                {/* All products in the shopping cart*/}
                {products.map((product, idx) => {
                    return (
                        <Fragment key={idx}>
                        {(() => {
                                const productName = product.foodData.productName;
                                const foodData = product.foodData;

                                // The sum of all the portion sizes.
                                const totalGrams = product.foods.reduce((acc, p) => 
                                    p? acc + p.diaryData.portionSize: acc // If undefined then skip.
                                , 0);
                                // The total grams in a item is the serving size times servings in the item.
                                const gramsPerItem = foodData.gramWeight * foodData.servings;

                                const nItemsToBuy = roundTo(Math.ceil(totalGrams / gramsPerItem), 1);
                                const totalCost = nItemsToBuy * foodData.productPrice;

                                // Update total cost.
                                groceriesTotalCost += totalCost;

                                return (
                                    <tr key={idx}>
                                        <td>
                                            <span className="d-flex justify-content-between align-content-center" title={productName}>
                                                {productName.length > 30? `${productName.slice(0, 30)}...`: productName}
                                                <button className="bg-transparent border-0 p-0 m-0 d-flex align-items-center">
                                                    <span className="material-symbols-outlined">
                                                        {foodData.productLink?
                                                            <a href={foodData.productLink} target="_blank" className="text-decoration-none text-body">
                                                                open_in_new
                                                            </a>
                                                            :
                                                            'open_in_new'
                                                        }
                                                    </span>
                                                </button>
                                            </span>
                                        </td>
                                        <td>{nItemsToBuy}</td>
                                        <td>{totalCost}</td>
                                    </tr>
                                )
                            })()}
                        </Fragment>
                    )   
                })}

                <tr>
                    <td></td>
                    <td>
                        <span className="fw-bold">Total</span>
                    </td>
                    <td>
                        {`$${groceriesTotalCost}`}
                    </td>
                </tr>
            </tbody>
        </table>
    </>
    )
}

export default GroceryHaul;
