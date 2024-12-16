import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import '../styles/index.css';
import CreateFoodForm from "../components/FoodProducts/CreateFood/CreateFoodForm";
import FoodProducts from "../components/FoodProducts/FoodProducts";

const CreateFood = () => {
    return (
        <>
            <FoodProducts />
        </>
    )
}

export default CreateFood