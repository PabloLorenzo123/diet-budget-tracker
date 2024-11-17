import { useState, useEffect } from "react";
import FoodDetails from "./FoodDetails/FoodDetails";
import Modal from "../../../Modal";

import { AddFoodModalTabs } from "../../../../constants";
import api from "../../../../api";

import { roundTo } from "../../../../lib/functions";

import { toast } from "react-toastify";

import '../../../../styles/searchBar.css';
import CreateTab from './CreateTab'
import SearchBar from "./SearchBar";
import FoodsTable from "./FoodsTable";


const AddFoodModal = ({showModal, setShowModal, meals, setMeals, dailyTargets}) => {
    const [tab, setTab] = useState(AddFoodModalTabs[0]);

    const [foodProductsLoading, setFoodProductsLoading] = useState(false);
    const [foodProducts, setFoodProducts] = useState([]);

    const [selectedFood, setSelectedFood] = useState({});
    const [showFoodDetails, setShowFoodDetails] = useState(false);

    const getAllFoodProducts = async () => {
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

    const selectFood = (food) => {
        if (food == selectedFood){
            setShowFoodDetails(false);
            setSelectedFood({});
        } else {
            setSelectedFood(food);
            setShowFoodDetails(true);
        } 
    }

    useEffect(() => {
        // When first mounted return all the food products created by the user.
        const getAllFP = async () => {
            setFoodProductsLoading(true);
            await getAllFoodProducts();
            setFoodProductsLoading(false);
        }
        getAllFP();
    }, [])

    return (
        <Modal setShow={setShowModal}>
            <div className="custom-modal-header mb-4">
                <h4 className="fw-bold">Add Food to Diary</h4>
            </div>

            <div>
                <SearchBar
                    setFoodProducts={setFoodProducts}
                    tab={tab}
                    setTab={setTab}
                    showFoodDetails={showFoodDetails}
                    setShowFoodDetails={setShowFoodDetails}
                    getAllFoodProducts={getAllFoodProducts}
                    setFoodProductsLoading={setFoodProductsLoading}
                />
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
                <div>
                {(() => {
                    const searchResultsHeight = showFoodDetails? '200px': '400px';
                    const foodDetailsHeight = '250px';
                    return (
                        <>
                        <FoodsTable
                            foodProducts={foodProducts}
                            selectFood={selectFood}
                            selectedFood={selectedFood}
                            searchResultsHeight={searchResultsHeight}
                            foodProductsLoading={foodProductsLoading}
                        />
                        {showFoodDetails &&
                            <div style={{height: foodDetailsHeight}}>
                                <FoodDetails
                                    showFoodDetails={showFoodDetails}
                                    setShowFoodDetails={setShowFoodDetails}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    selectedFood={selectedFood}
                                    setSelectedFood={setSelectedFood}
                                    meals={meals}
                                    setMeals={setMeals}
                                    dailyTargets={dailyTargets}
                                />
                            </div>
                        }
                    </>
                    ) 
                })()}
                </div>
            }
            {tab == 'Create' &&
                <CreateTab getFoodProducts={getAllFoodProducts} tab={tab} setTab={setTab}/>
            }
        </Modal>
    )
}

export default AddFoodModal;
