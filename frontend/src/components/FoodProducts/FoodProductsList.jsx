import { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const FoodProductsList = ({showIndex, setShowIndex, showCreate, setShowCreate, selectedFood, setSelectedFood}) => {
    const [foodProducts, setFoodProducts] = useState([]);

    const editFood = (food) => {
        setSelectedFood(food);
        setShowIndex(false);
        setShowCreate(true);
    }

    const deleteFood = async (e, food) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete ${food.foodData.productName}?`)){
            try {
                const res = await api.delete(`diet/food_product/${food.id}/`);
                if (res.status == 200){
                    toast.success("Food product deleted.");
                    const newFoodProducts = foodProducts.filter(f => f.id != food.id);
                    setFoodProducts(newFoodProducts);
                }
            } catch (error) {
                toast.error(`There was a problem deleting this food product ${error}`);
            }
        }
    }

    useEffect(() => {
        const getFoodProducts = async () => {
            try {
                const res = await api.get('diet/food_products/');
                if (res.status == 200){
                    setFoodProducts(res.data.foods);
                }
            } catch (error) {
                toast.error(`Could not retrieve your food products ${error}`);
            }
        }
        getFoodProducts();
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Servings</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Price</th>
                    <th></th>
                </tr>  
            </thead>
            <tbody>
                {foodProducts.map(f => {
                    return (
                        <tr key={f.id} onClick={() => editFood(f)}>
                            <td>{f.foodData.productName}</td>
                            <td>{f.foodData.servings}</td>
                            <td>{f.nutritionData.energy}kcal</td>
                            <td>{f.nutritionData.protein}g</td>
                            <td>{f.nutritionData.netCarbs}g</td>
                            <td>{f.nutritionData.totalFat}g</td>
                            <td>${f.foodData.productPrice}</td>
                            <td>
                                <button type="button" className="delete-btn" onClick={e => deleteFood(e, f)}>
                                    <span className="material-symbols-outlined">
                                        delete_forever
                                    </span>
                                </button>
                            </td>
                        </tr>
                )})}
            </tbody>
        </table>
    )
}

export default FoodProductsList;
