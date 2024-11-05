import { useState, useEffect } from "react";
import FoodDetails from "./foodDetails";
import Modal from "../../../Modal";

import { AddFoodModalTabs } from "../../../../constants";
import api from "../../../../api";

import { roundTo } from "../../../../lib/functions";

import { toast } from "react-toastify";

import '../../../../styles/searchBar.css';
import CreateTab from './CreateTab'


const AddFoodModal = ({showModal, setShowModal, meals, setMeals}) => {
    const [tab, setTab] = useState(AddFoodModalTabs[0]);

    const [searchResults, setSearchResults] = useState([]);

    const [foodProducts, setFoodProducts] = useState([]);
    const [selectedFood, setSelectedFood] = useState({});
    const [showFoodDetails, setShowFoodDetails] = useState(false);

    const getFoodProducts = async () => {
        try {
            const res = await api.get('diet/food_products/');
            if (res.status == 200){
                setFoodProducts(res.data.foods);
                return true; // Indicates succesfull request.
            }
        } catch (error) {
            toast.error(`Could not retrieve your food products ${error}`);
            return false; // Indicates unsuccesfull request.
        }
    }

    useEffect(() => {
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
                {AddFoodModalTabs.map((item, idx) => {
                    return (
                    <div className={`search-tab${item == tab? ' selected-tab': ''}`} key={item + 'tab'} onClick={() => setTab(item)}>
                        {item}
                    </div>
                )})}
            </div>

            {tab == 'All' &&
                <>
                    <p className="mb-0">Per serving.</p>
                    <div className={`search-results ${showFoodDetails? 'shrink': ''}`}>
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
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedFood={selectedFood}
                        setSelectedFood={setSelectedFood}
                        meals={meals}
                        setMeals={setMeals}
                    />
                </>
            }
            {tab == 'Create' &&
                <CreateTab getFoodProducts={getFoodProducts} tab={tab} setTab={setTab}/>
            }
        </Modal>
    )
}

export default AddFoodModal;
