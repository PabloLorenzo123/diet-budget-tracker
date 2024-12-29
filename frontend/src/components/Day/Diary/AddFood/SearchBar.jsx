import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from '../../../../api';

const SearchBar = ({setFoodProducts, tab, setTab, showFoodDetails, setShowFoodDetails, getAllFoodProducts, setFoodProductsLoading}) => {
    const [searchInput, setSearchInput] = useState('');
    const [prevSearch, setPrevSearch] = useState('');

    const searchFoodProducts = async () => {
        if (searchInput == prevSearch) return;
        setFoodProductsLoading(true);
        if (!searchInput){
            // If not search input shou all food products.
            getAllFoodProducts();
        } else {
            try {
                const res = await api.get(`diet/food_products/search/?q=${searchInput}`);
                if (res.status == 200){
                    setFoodProducts(res.data.foods); // Update the results.
                    if (tab != 'All') { // If on another tab bring back to 'All' tab.
                        setTab('All');
                    }
                    if (showFoodDetails){
                        setShowFoodDetails(false); // Hide the show food details if it's shown.
                    }
                }
            } catch (error) {
                toast.error(`Error: ${error}`);
                setFoodProducts([]); // To show no results.
                return false; // Indicates unsuccesfull request.
            }
        }
        setPrevSearch(searchInput);
        setFoodProductsLoading(false);
    }

   

    return (
        <>
        <div className="search-bar-container">
            <div className="search-bar">
                <span className="material-symbols-outlined search-icon">
                    search
                </span>
                <input
                type="search"
                placeholder="Search food"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        searchFoodProducts();
                    }
                }}
                />
            </div>
            <button type="button" className="btn btn-primary" onClick={searchFoodProducts}>Search</button>
        </div>
        </>
    )
}

export default SearchBar;
