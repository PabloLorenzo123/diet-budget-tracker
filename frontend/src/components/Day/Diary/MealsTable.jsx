import { useState, useEffect, Fragment } from "react";
import AddFoodBtn from "./AddFood/AddFoodBtn";
import { titleCase, roundTo } from "../../../lib/functions";

const MealsTable = ({meals, setMeals}) => {

    const getTotalNutrients = (foods, nutrient) => roundTo(foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 2);

    const setShow = (meal) => {
        const mealsCopy = {...meals};
        mealsCopy[meal].show = !mealsCopy[meal].show;
        setMeals(mealsCopy);
    }

    return (
        <>
            <AddFoodBtn meals={meals} setMeals={setMeals}/>
            <div className="day-meals">
                <table className="table-meals">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(meals).map((meal, index) => {
                            return (
                            <Fragment key={meal}>
                                <tr className={`tr-meal${index + 1 == meals.length? ' last': ''}`}>
                                    <td className="td-meal">{titleCase(meal)}</td>
                                    <td className="td-dairy-data">
                                        {meals[meal].foods.length > 0 && 
                                        <>
                                        <span>{getTotalNutrients(meals[meal].foods, 'energy')} kcal - </span>
                                        <span>{getTotalNutrients(meals[meal].foods, 'protein')} g protein - </span>
                                        <span>{getTotalNutrients(meals[meal].foods, 'netCarbs')} g carbs - </span>
                                        <span>{getTotalNutrients(meals[meal].foods, 'totalFat')} g fat - </span>
                                        <span>${meals[meal].foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0)}</span>
                                        </>
                                        }
                                    </td>
                                    <td className="d-flex justify-content-end">
                                        <button className="meal-toggle-btn" onClick={() => setShow(meal)}>
                                            {!meals[meal].show?
                                            <span className="material-symbols-outlined">
                                            stat_minus_1
                                            </span>:
                                            <span className="material-symbols-outlined">
                                            stat_1
                                            </span>}
                                        </button>
                                    </td>
                                </tr>
                                
                                {meals[meal].foods.length > 0 &&
                                <tr style={{display: meals[meal].show? 'table-row': 'none'}}>
                                    <td colSpan="3">
                                        <table className="table-food ">
                                            <tbody>
                                                {meals[meal].foods.map((f, idx) => {
                                                    return (
                                                        <tr key={`${f.id}-${idx}`}>
                                                            <td>{f.foodData.productName}</td>
                                                            <td>{f.diaryData.servings}</td>
                                                            <td>{f.diaryData.servingMeasure.unit}{f.diaryData.servings > 1? 's': ''}</td>
                                                            <td>{f.nutritionalContribution.energy}kcal</td>
                                                            <td>{f.nutritionalContribution.protein}g</td>
                                                            <td>{f.nutritionalContribution.netCarbs}g</td>
                                                            <td>{f.nutritionalContribution.totalFat}g</td>
                                                            <td>${f.diaryData.totalCost}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                }
                            </Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MealsTable;
