import {useState, useEffect, Fragment} from 'react';
import { roundTo } from '../../../lib/functions';
import Modal from '../../Modal';

const DietSummaryModal = ({meals, setShowModal}) => {
    return (
        <>

        <Modal setShow={setShowModal} scroll={true} header={'Diet plan'}>

            <hr className="border border-primary border-3 opacity-75" />
            {/* Days */}
            {meals.map((day, idx) => {
                return (
                    <Fragment key={idx}>
                        <h5 className='fw-bold'>{`Day ${idx + 1}`}</h5>
                        <hr />
                        {/* Meals */}
                    
                                
                        {day.filter(m => m && !m.hideFromDiary && m.foods.length).map((meal, idx) => {
                            const totalCalories = roundTo(meal.foods.reduce((acc, f) => acc + f.nutritionalContribution.energy, 0), 2);
                            const totalProtein = roundTo(meal.foods.reduce((acc, f) => acc + f.nutritionalContribution.protein, 0), 2);
                            const totalNetCarbs = roundTo(meal.foods.reduce((acc, f) => acc + f.nutritionalContribution.netCarbs, 0), 2);
                            const totalFat = roundTo(meal.foods.reduce((acc, f) => acc + f.nutritionalContribution.totalFat, 0), 2);
                            const totalCost = roundTo(meal.foods.reduce((acc, f) => acc + f.diaryData.totalCost, 0), 2);

                            return (
                                <>
                                <h6>{meal.name}</h6>
                                <table className='table'>
                                    <tbody className='table-group-divider'>
                                        {meal.foods.map((food, idx) => {
                                            console.log(food);
                                            return (
                                                <tr key={idx}>
                                                    <td>{food.foodData.productName}</td>
                                                    <td>{`${food.diaryData.servings} ${food.diaryData.servingMeasure.unit}`}</td>
                                                    <td>
                                                        {food.nutritionalContribution.energy}kcal
                                                    </td>
                                                    <td>
                                                        {food.nutritionalContribution.protein}g
                                                    </td>
                                                    <td>
                                                        {food.nutritionalContribution.netCarbs}g
                                                    </td>
                                                    <td>
                                                        {food.nutritionalContribution.totalFat}g
                                                    </td>
                                                    <td>
                                                        ${food.diaryData.totalCost}
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                        {/* Total */}
                                        <tr>
                                            <td colSpan={2}>
                                                <span className='fw-bold'>Total</span>
                                            </td>
                                            <td className='fw-bold'>
                                                {totalCalories}kcal
                                            </td>
                                            <td className='fw-bold'>
                                                {totalProtein}g
                                            </td>
                                            <td className='fw-bold'>
                                                {totalNetCarbs}g
                                            </td>
                                            <td className='fw-bold'>
                                                {totalFat}g
                                            </td>
                                            <td className='fw-bold'>
                                                ${totalCost}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    

                                </>
                            )
                        })}
                              
                        
                    </ Fragment>
                )
                
            })}

        </Modal>
        
        </>
    )
}

export default DietSummaryModal;
