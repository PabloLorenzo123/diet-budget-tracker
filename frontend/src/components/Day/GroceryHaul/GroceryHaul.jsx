import { useState, useEffect, Fragment } from "react";
import { roundTo } from "../../../lib/functions";
import { groceryHaulMaxHeight } from "../../../constants";
import GroceryHaulModal from "./GroceryHaulModal";
import ProductsList from "./ProductsList";

const GroceryHaul = ({groceries}) => {
    // How the grocery works.
    // There's a grocery state which is an object where each key is the id of a product. and the value is {name: '', foods: []}
    // When a product is added to the diary via AddFoodBtn.jsx the product is added to the foods ^ array, and inside that food object.
    // it has a diaryData property which has a groceriesIdx property that indicates the index of this food product in the grocery foods array.
    // This food object is also added to the meals table, such that when the servings, serving size is updated the grocery state can be updated as well.
    // When the food object is deleted from the meals state its index in the groceries foods array is set to undefined, instead of removing.
    // the element from the array.

    // Show the products which have food items in the diary, otherwise don't show.
    const [showModal, setShowModal] = useState(false);
    const [receipt, setReceipt] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        let newReceipt = [];
        let groceriesTotalCost = 0;

        const products = Object.keys(groceries).map(prodId => groceries[prodId]).filter(p => p.foods.some(f => f));
        products.forEach(product => {
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

            newReceipt.push({
                product,
                nItemsToBuy,
                totalCost,
            })
        })

        setReceipt(newReceipt);
        setTotalCost(groceriesTotalCost);
    }, [groceries])

    const style = {
        maxHeight: groceryHaulMaxHeight,
        overflowY: 'scroll',
    }

    let groceriesTotalCost = 0;

    return (
    <>
        <div className="d-flex justify-content-between align-items-center">
            <h5>Groceries</h5>
            <button className="bg-transparent p-0 m-0 border-0" onClick={() => setShowModal(true)}>
                <span className="material-symbols-outlined">
                    expand_content
                </span>
            </button>
        </div>
        
        <div style={style}>
            <ProductsList receipt={receipt}/>
        </div>
        <hr/>

        <p className="text-end me-4">
            <span className="fw-bold me-4">Total</span>{`$${totalCost}`}
        </p>

        {showModal && 
            <GroceryHaulModal setShowModal={setShowModal} receipt={receipt} totalCost={totalCost}/>
            }
    </>
    )
}

export default GroceryHaul;
