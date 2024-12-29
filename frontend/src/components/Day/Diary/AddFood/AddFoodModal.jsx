import { useState, useEffect } from "react";
import FoodDetailsForm from "./FoodDetailsForm/FoodDetailsForm";
import Modal from "../../../Modal";

import { AddFoodModalVisibleTabs } from "../../../../constants";
import api from "../../../../api";

import { roundTo } from "../../../../lib/functions";

import { toast } from "react-toastify";

import '../../../../styles/searchBar.css';
import CreateTab from './Tabs/CreateTab'
import SearchBar from "./SearchBar";
import FoodsTable from "./FoodsTable";
import EditFoodTab from "./Tabs/EditFoodTab";


const AddFoodModal = ({showModal, setShowModal, meals, setMeals, currentDay, groceries, setGroceries, dailyTargets}) => {
    const [tab, setTab] = useState(AddFoodModalVisibleTabs[0]);

    const [foodProductsLoading, setFoodProductsLoading] = useState(false);
    const [foodProducts, setFoodProducts] = useState([]);

    const [selectedFood, setSelectedFood] = useState({});
    // => {id, nutritionData, foodData: {gramWeight, measure, productLink, productName, productPrice, servings}}
    const [showFoodDetails, setShowFoodDetails] = useState(false);

    const [isOnMobile, setIsOnMobile] = useState(false);

    useEffect(() => {
        // When first mounted return all the food products created by the user.
        const getAllFP = async () => {
            try {
                setFoodProductsLoading(true);
                getAllFoodProducts();
            } catch (err) {
                console.log(err);
            } finally {
                setFoodProductsLoading(false);
            }
        }
        const resize = () => {
            setIsOnMobile(window.innerWidth < 760);
        }
        getAllFP();

        resize(); // Check on mount.
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
        
    }, [])

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

    const unselectFoodP = () => {
        setShowFoodDetails(false);
        setSelectedFood({});
    }

    const selectFood = (food) => {
        if (food == selectedFood){
            unselectFoodP();
        } else {
            setSelectedFood(food);
            setShowFoodDetails(true);
        } 
    }

    

    return (
        <Modal setShow={setShowModal} header={'Add Food to Diary'}>

            {/* Search bar */}
            <div className="d-flex align-items-center" style={{height: '5%'}}>
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

            {/* Tabs */}
            <div className="d-flex search-tabs mb-2">
                {AddFoodModalVisibleTabs.map(item => {
                    return (
                    <div className={`search-tab${item == tab? ' selected-tab': ''}`} key={item} onClick={() => setTab(item)}>
                        {item}
                    </div>
                )})}
                {/* The edit tab ain't visible */}
                {tab == 'Edit' &&
                    <div className="search-tab selected-tab">
                        Edit Food Product
                    </div>
                }
            </div>

            {tab == 'All' &&
                <div style={{height: '80%'}}>
                    {(() => {
                        const searchResultsHeight = showFoodDetails? (isOnMobile? '0%': '45%'): '95%';
                        const foodDetailsHeight = isOnMobile? '100%': '55%';
                        return (
                            <>
                                <FoodsTable
                                    foodProducts={foodProducts}
                                    selectFood={selectFood}
                                    selectedFood={selectedFood}
                                    searchResultsHeight={searchResultsHeight}
                                    foodProductsLoading={foodProductsLoading}
                                    setTab={setTab}
                                    isOnMobile={isOnMobile}
                                />
                                {showFoodDetails &&
                                    <div style={{height: foodDetailsHeight, overflowY: isOnMobile? 'scroll': ''}}>
                                        <FoodDetailsForm
                                            showFoodDetails={showFoodDetails}
                                            setShowFoodDetails={setShowFoodDetails}
                                            showModal={showModal}
                                            setShowModal={setShowModal}
                                            selectedFood={selectedFood}
                                            setSelectedFood={setSelectedFood}
                                            meals={meals}
                                            setMeals={setMeals}
                                            currentDay={currentDay}
                                            groceries={groceries}
                                            setGroceries={setGroceries}
                                            dailyTargets={dailyTargets}
                                            setTab={setTab}
                                            foodProducts={foodProducts}
                                            setFoodProducts={setFoodProducts}
                                            unselectFoodP={unselectFoodP}
                                            isOnMobile={isOnMobile}
                                        />
                                    </div>
                                }
                            </>
                        ) 
                    })()}
                </div>
            }
            {tab == 'Create' &&
                <CreateTab
                    getFoodProducts={getAllFoodProducts}
                    tab={tab}
                    setTab={setTab}
                    selectedFood={selectFood}
                    setSelectedFood={setSelectedFood}
                    setShowFoodDetails={setShowFoodDetails}
                />
            }
            {tab == 'Edit' &&
                <EditFoodTab
                    selectedFood={selectedFood}
                    meals={meals}
                    setMeals={setMeals}
                    groceries={groceries}
                    setGroceries={setGroceries}
                    foodProducts={foodProducts}
                    setFoodProducts={setFoodProducts}
                    setTab={setTab}
                />
            }
        </Modal>
    )
}

export default AddFoodModal;
