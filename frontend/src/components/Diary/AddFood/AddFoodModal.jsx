import { useState, useEffect } from "react";
import FoodDetails from "./foodDetails";
import Modal from "../../Modal";

import { SearchCategories } from "../../../constants";
import api from "../../../api";

import { roundTo } from "../../../lib/functions";

import { toast } from "react-toastify";

import '../../../styles/searchBar.css';


const AddFoodModal = ({setShowModal}) => {
    const [searchCategory, setSearchCategory] = useState(SearchCategories[0]);

    const [searchResults, setSearchResults] = useState([]);

    const [foodProducts, setFoodProducts] = useState([]);
    const [selectedFood, setSelectedFood] = useState({});
    const [showFoodDetails, setShowFoodDetails] = useState(false);

    

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

    const selectFood = (food) => {
        if (food == selectedFood){
            setShowFoodDetails(false);
            setSelectedFood({});
        } else {
            setSelectedFood(food);
            setShowFoodDetails(true);
        }
        
    }

    return (
        <Modal setShow={setShowModal}>
            <div className="custom-modal-header mb-4">
                <h4>Add Food to Diary</h4>
            </div>

            <div className="search-bar-container mb-2">
                <div className="search-bar">
                <span className="material-symbols-outlined search-icon">
                    search
                </span>
                <input type="search" placeholder="Search food" autoFocus/>
                </div>
                <button type="button" className="btn btn-primary">Search</button>
            </div>

            <div className="d-flex search-tabs mb-2">
                {SearchCategories.map((item, idx) => {
                return (
                <div className={`search-tab${item == searchCategory? ' selected-tab': ''}`} key={item + 'tab'} onClick={() => setSearchCategory(item)}>
                    {item}
                </div>
                )})}
            </div>

            <div className={`search-results ${showFoodDetails? 'shrink': ''}`}>
                <p className="">Per serving.</p>
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
                                <tr key={f.id} onClick={() => selectFood(f)} className={f == selectedFood? 'selected': ''}>
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

            <FoodDetails
                showFoodDetails={showFoodDetails}
                setShowFoodDetails={setShowFoodDetails}
                selectedFood={selectedFood}
            />
        </Modal>
    )
}

export default AddFoodModal;
