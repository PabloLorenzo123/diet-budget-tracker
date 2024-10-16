import { useState, useEffect, Fragment } from "react";

const Day = () => {
    const [unCategorized, setUnCategorized] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [showUnCategorized, setShowUnCategorized] = useState(false);
    const [showBreakfast, setShowBreakfast] = useState(false);
    const [showLunch, setShowLunch] = useState(false);
    const [showDinner, setShowDinner] = useState(false);
    const [showSnacks, setShowSnacks] = useState(false);

    const meals = [
        {name: 'Uncategorized', state: unCategorized, set: {setUnCategorized}, show: showUnCategorized, setShow: setShowUnCategorized},
        {name: 'Breakfast', state: breakfast, set: {setBreakfast}, show: showBreakfast, setShow: setShowBreakfast},
        {name: 'Lunch', state: lunch, set: {setLunch}, show: showLunch, setShow: setShowLunch},
        {name: 'Dinner', state: dinner, set: {setDinner}, show: showDinner, setShow: setShowDinner},
        {name: 'Snacks', state: snacks, set: {setSnacks}, show: showSnacks, setShow: setShowSnacks}
    ];


    return (
        <>
            <div className="day-container p-2">
                <div className="day-options p-1">
                    <button className="btn btn-secondary">Add Food</button>
                </div>
                <div className="day-meals">

                    <table className="table-meals">
                        <tbody>
                            {meals.map((meal, index) => {
                                return (
                                <Fragment key={meal.name}>
                                    <tr className="meal">
                                        <td>{meal.name}</td>
                                        <td className="d-flex justify-content-end">
                                            <button className="meal-btn" onClick={() => meal.setShow(prev => !prev)}>
                                                {!meal.show?
                                                <span class="material-symbols-outlined">
                                                stat_minus_1
                                                </span>:
                                                <span class="material-symbols-outlined">
                                                keyboard_control_key
                                                </span>}
                                            </button>
                                        </td>
                                    </tr>
                                    

                                    <tr style={{display: meal.show? 'table-row': 'none'}}>
                                        <td colSpan="2">
                                            <table className="table-food ">
                                                <tbody>
                                                    <tr><td>Rice</td><td></td></tr>
                                                    <tr><td>Beans</td><td></td></tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </Fragment>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Day;
