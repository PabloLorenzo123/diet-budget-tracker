
import { useState, useEffect, Fragment } from "react";
import { roundTo } from "../../../lib/functions";
import { groceryHaulMaxHeight } from "../../../constants";
import GroceryHaulModal from "./GroceryHaulModal";
import ProductsList from "./ProductsList";

const GroceryHaul = ({groceries}) => {
    // How the grocery works.
    // There's a grocery state which is an object where each key 
    // is the id of a product. and the value is {foodData: {productName, productLink, measure, productPrice, servings}, foods: []}
    // When a product is added to the diary via AddFoodBtn.jsx 
    // the product is added to the foods ^ array, and inside 
    // that food object.
    // it has a diaryData property which has a groceriesIdx property 
    // that indicates the index of this food product in the grocery foods array.
    // This food object is also added to the meals table, 
    // such that when the servings, serving size is updated 
    // the grocery state can be updated as well.
    // When the food object is deleted from the meals state its 
    // index in the groceries foods array is set to undefined, 
    // instead of removing.
    // the element from the array.

    // Show the products which have food items in the diary, otherwise don't show.
    const [receipt, setReceipt] = useState([]);

    const [totalGroceriesCost, setTotalGroceriesCost] = useState(0);
    const [totalDietPlanCost, setTotalDietPlanCost] = useState(0);

    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        let newReceipt = [];
        let groceriesTotalCost = 0;
        let dietPlanTotalCost = 0;
        console.log(groceries);

        // Get the products objects, which in their list of 'foods' (times they appear in the diet plan) there is a least a product objet.
        // Which is not null.
        const products = Object.keys(groceries).map(prodId => groceries[prodId]).filter(p => p.foods.some(f => f));

        products.forEach(product => {
            const foodData = product.foodData; // product name, link, servings, gramWeight, etc.

            // The sum of all the portion sizes.
            const totalGrams = product.foods.reduce((acc, p) => 
                p != null? acc + p.diaryData.portionSize: acc // If undefined then skip.
            , 0);

            // The total grams in a item is the serving size times servings in the item.
            const productNetContent = foodData.gramWeight * foodData.servings;

            const nItemsToBuy = roundTo(Math.ceil(totalGrams / productNetContent), 1);
            
            const totalBruteCost = nItemsToBuy * foodData.productPrice;

            console.log(totalGrams, productNetContent, foodData.productPrice)
            const totalNetCost = roundTo(totalGrams * (foodData.productPrice / productNetContent), 2);
            
            // Update total cost.
            groceriesTotalCost += totalBruteCost;
            dietPlanTotalCost += totalNetCost;

            newReceipt.push({
                product,
                nItemsToBuy,
                totalCost: totalBruteCost,
            })
        })

        setReceipt(newReceipt);
        setTotalGroceriesCost(groceriesTotalCost);
        setTotalDietPlanCost(dietPlanTotalCost);

    }, [groceries])

    const style = {
        maxHeight: groceryHaulMaxHeight,
        overflowY: 'scroll',
    }

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
            <span className="fw-bold me-4">Total</span>{`$${totalGroceriesCost}`}
        </p>
        <p>
            <span className="fw-bold">Diet Plan Total Cost: </span>
            ${totalDietPlanCost}
        </p>

        {showModal && 
            <GroceryHaulModal
                setShowModal={setShowModal}
                receipt={receipt}
                totalGroceriesCost={totalGroceriesCost}
            />
        }
    </>
    )
}

export default GroceryHaul;
