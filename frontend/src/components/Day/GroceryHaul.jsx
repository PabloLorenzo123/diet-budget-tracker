import { useState, useEffect, Fragment } from "react";
import { roundTo } from "../../lib/functions";

const GroceryHaul = ({groceries}) => {

    const products = Object.keys(groceries).map(prodId => groceries[prodId]);
    console.log(products)

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
                {products.map((product, idx) => {
                    return (
                        <Fragment key={idx}>
                        {(() => {
                                const productName = product.foodData.productName;
                                const foodData = product.foodData;
                                // The sum of all the portion sizes.
                                const totalGrams = product.foods.reduce((acc, p) => acc + p.diaryData.portionSize, 0);
                                const gramsPerItem = foodData.gramWeight / foodData.servings
                                const nItemsToBuy = roundTo(Math.ceil(totalGrams / gramsPerItem), 1);
                                const totalCost = nItemsToBuy * foodData.productPrice;
                                console.log(groceries)
                                return (
                                    <tr key={idx}>
                                        <td>
                                            <a href={foodData.productLink} target="_blank">
                                                {productName}
                                            </a>
                                        </td>
                                        <td>{nItemsToBuy}</td>
                                        <td>{totalCost}</td>
                                    </tr>
                                )
                            })()}
                        </Fragment>
                    )
                    
                    
                })}
            </tbody>
        </table>
    </>
    )
}

export default GroceryHaul;
