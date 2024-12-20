import { useState, useEffect } from "react";
import { defaultDiaryGroupObject, maxNumberOfDays } from "../../constants";

const DaySwitcher = ({meals, setMeals, currentDay, setCurrentDay}) => {

    const IsCurrentDayEmpty = () => {
        return meals[currentDay].filter(m => !m.hideFromDiary).every(m => m.foods.length == 0);
    }

    const prevDayDisabled = currentDay - 1 < 0;
    const nextDayDisabled = currentDay + 1 >= maxNumberOfDays || IsCurrentDayEmpty() && !meals[currentDay + 1];

    const switchToPrevDay = () => !prevDayDisabled? setCurrentDay(prev => prev - 1): '';

    const switchToNextDay = () => {
        if (nextDayDisabled) return; // Don't exceed the limit of days.
        if (!meals[currentDay + 1]) {
            // Create another day with the same meal names that the previous one.
            const newDay = [meals[currentDay].map(m => {
                return {...defaultDiaryGroupObject, name: m.name, hideFromDiary: m.hideFromDiary}
            })];

            setMeals(prev => {
                return [...prev, ...newDay];
            })
        }
        setCurrentDay(prev => prev + 1);
    }

    const navButtonsStyle = {width: '50%'};
    return (
        <>
        <h6 className="text-center fw-bold">
            Day {currentDay + 1}
            {meals.length > 1? ` / ${meals.length}`: ''}
            </h6>
        <div className="bg-secondary d-flex justify-content-center">
            {/* Previous button */}
            <button
            type="btn"
            className="btn btn-secondary"
            disabled={prevDayDisabled}
            style={navButtonsStyle}
            onClick={switchToPrevDay}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </div>
            </button>
            {/* Next button */}
            <button
            type="btn"
            className="btn btn-secondary"
            disabled={nextDayDisabled}
            style={navButtonsStyle}
            onClick={switchToNextDay}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
            </button>
        </div>
        
        </>
    )
}

export default DaySwitcher;
