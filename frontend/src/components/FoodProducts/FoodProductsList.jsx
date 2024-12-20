import { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const FoodProductsList = ({showIndex, showCreateForm, setShowIndex, showCreate, setShowCreate, selectedFood, setSelectedFood}) => {

    const [loading, setLoading] = useState(true);
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
                setLoading(true);
                const res = await api.get('diet/food_products/');
                if (res.status == 200){
                    setFoodProducts(res.data.foods);
                }
            } catch (error) {
                toast.error(`Could not retrieve your food products ${error}`);
            } finally {
                setLoading(false);
            }
        }
        getFoodProducts();
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <>
        <h2 className="fw-bold">Food Products</h2>
            <p className="lead">Browse through your food products.</p>
                <div className="mt-2 border border-black rounded-3 food-products-container">
                    <button type="button" className="add-food-btn" onClick={showCreateForm}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        ADD FOOD PRODUCT
                    </button>
                    <p className="lead">Create a new food product from the information of a local supermarket. </p>
                    <hr className="mt-4"/>
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
            </div>
        </>
    )
}

export default FoodProductsList;
