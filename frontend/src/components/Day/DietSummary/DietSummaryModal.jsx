import {useState, useEffect, Fragment} from 'react';

import { roundTo, getTotalNutrientsInMeal, titleCase } from '../../../lib/functions';

import Modal from '../../Modal';

const DietSummaryModal = ({meals, setShowModal, isMobile}) => {
    const notEmptyDays = meals.filter(d => d.filter(m => !m.hideFromDiary).some(m => m.foods.length > 0));
    
    return (
        <>

        <Modal setShow={setShowModal} scroll={true} header={'Diet plan'}>

            <hr className="border border-primary border-3 opacity-75" />
            {/* Days that are not empty*/}
            {notEmptyDays.map((day, idx) => {
                return (
                    <Fragment key={idx}>
                        <h5 className='fw-bold m-0 p-0'>
                            {`Day ${idx + 1}`}
                        </h5>
                        <hr className='mt-2'/>

                        {/* Meals */}
                    
                        {/*Show meals that are not hidden and that have food elements within them.*/}
                        {day.filter(m => m && !m.hideFromDiary && m.foods.length > 0).map((meal, idx) => {
                            // Total values of the meal.
                            const totalEnergy = getTotalNutrientsInMeal(meal.foods, 'energy');
                            const totalProtein = getTotalNutrientsInMeal(meal.foods, 'protein');
                            const totalNetCarbs = getTotalNutrientsInMeal(meal.foods, 'netCarbs');
                            const totalFat = getTotalNutrientsInMeal(meal.foods, 'totalFat');
                            const totalCost = roundTo(meal.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 2);

                            return (
                                <table className='table' key={`meal-${idx}`}>
                                    <thead>
                                        <tr className='table-secondary'>
                                            <th colSpan={isMobile ? '2' : '7'}>
                                                {titleCase(meal.name)}
                                                {isMobile && (
                                                    <div>
                                                        <span style={{color: 'red'}}>{totalEnergy}kcal</span>, 
                                                        <span style={{color: 'green'}}>{totalProtein} g Protein</span>, 
                                                        <span style={{color: 'blue'}}>{totalNetCarbs} g Carbs</span>, 
                                                        <span style={{color: 'orange'}}>{totalFat} g Fat</span>
                                                        <span>${totalCost}</span>
                                                    </div>
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {meal.foods.map((food, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{food.foodData.productName}</td>
                                                    {isMobile ? (
                                                        <td>
                                                            <div style={{color: 'red'}}>{food.nutritionalContribution.energy}kcal</div>
                                                            <div style={{color: 'green'}}>{food.nutritionalContribution.protein}g</div>
                                                            <div style={{color: 'blue'}}>{food.nutritionalContribution.netCarbs}g</div>
                                                            <div style={{color: 'orange'}}>{food.nutritionalContribution.totalFat}g</div>
                                                            <div>${roundTo(food.diaryData.totalCost, 2)}</div>
                                                        </td>
                                                    ) : (
                                                        <>
                                                            <td>{`${food.diaryData.servings} ${food.diaryData.servingMeasure.unit}`}</td>
                                                            <td>{food.nutritionalContribution.energy}kcal</td>
                                                            <td>{food.nutritionalContribution.protein}g</td>
                                                            <td>{food.nutritionalContribution.netCarbs}g</td>
                                                            <td>{food.nutritionalContribution.totalFat}g</td>
                                                            <td>${roundTo(food.diaryData.totalCost, 2)}</td>
                                                        </>
                                                    )}
                                                </tr>
                                            )
                                        })}
                                        {/* Total */}
                                        {!isMobile && (
                                            <tr>
                                                <td colSpan={2}>
                                                    <span className='fw-bold'>Total</span>
                                                </td>
                                                <td className='fw-bold'>{totalEnergy}kcal</td>
                                                <td className='fw-bold'>{totalProtein}g</td>
                                                <td className='fw-bold'>{totalNetCarbs}g</td>
                                                <td className='fw-bold'>{totalFat}g</td>
                                                <td className='fw-bold'>${totalCost}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )
                        })}
                    </Fragment>
                )
                
            })}

        </Modal>
        
        </>
    )
}

export default DietSummaryModal;
