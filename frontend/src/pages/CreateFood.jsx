import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import '../styles/index.css';
import CreateFoodForm from "../components/CreateFood/CreateFoodForm";

const CreateFood = () => {
    return (
        <>
            <NavBar />
            <div>
                <main id="app">
                    <div id="create-food-container">
                        <h2 className="fw-bold">Create Food Product</h2>
                        <p className="text-body-secondary">Create a new food product.</p>
                        
                        <CreateFoodForm />
                        

                    </div>
                </main>
            </div>
        </>
    )
}

export default CreateFood