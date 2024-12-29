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
                <div className="mt-2 border border-black rounded-3 food-products-container" style={{color: 'black'}}>
                    <button type="button" className="add-food-btn" onClick={showCreateForm}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        ADD FOOD PRODUCT
                    </button>
                    <p className="lead">Create a new food product from the information of a local supermarket. </p>
                    <hr className="mt-4"/>

                    <div className="custom-table-wrapper">
                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">Description</th>
                                    <th scope="col">Servings</th>
                                    <th scope="col">Calories</th>
                                    <th scope="col">Protein</th>
                                    <th scope="col">Carbs</th>
                                    <th scope="col">Fat</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>  
                            </thead>
                            <tbody className="cursor-pointer">
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
            </div>
        </>
    )
}

export default FoodProductsList;
