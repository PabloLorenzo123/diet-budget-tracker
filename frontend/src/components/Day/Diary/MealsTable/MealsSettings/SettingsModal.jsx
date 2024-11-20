import { useState, useEffect } from "react";
import Modal from "../../../../Modal";
import ResBtn from "../../../../ResBtn";

import { defaultDiaryGroupObject, maxNumberOfMeals } from "../../../../../constants";
import { arraysAreEqual, roundTo } from "../../../../../lib/functions";
import { toast } from "react-toastify";
import api from "../../../../../api";

const SettingsModal = ({setShow, width, height, meals, setMeals, prevSettings, setPrevSettings, determineSettings}) => {

    const [isResLoading, setIsResLoading] = useState(false); // Use for the spinning wheel in the save btn.
    const [isResSuccesful, setIsResSuccesfull] = useState(false); // Use for the check mark in the save btn.

    const saveMealsSettings = async () => {
        setIsResLoading(true);
        const requestBody = meals.filter(m => m).map((m, idx) => {
            return {
                order: idx,
                name: m.name,
                hideFromDiary: m.hideFromDiary
            }
        })
        try {
            const res = await api.post('auth/diary_settings/meals/', requestBody);
            if (res.status == 200) {
                toast.success("Settings saved.");
                setIsResLoading(false);
                setIsResSuccesfull(true);
                setPrevSettings(() => determineSettings())
                setTimeout(() => setIsResSuccesfull(false), 1000); // Make res succesfull be false after 1000s.
                return
            }
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
        setIsResLoading(false);
    }

    const toggleHideFromDiary = (e, index) => {
        // Hides or shows a meal in the Dairy. This triggers when clicking the checkbox.
        setMeals(prev => {
            return prev.map((m, idx) => {
                if (idx == index) {
                    return {...m, hideFromDiary: !m.hideFromDiary}
                } else return m
            })
        })
    }

    const changeMealName = (e, index) => {
        const newName = e.target.value;
        let newArray = [...meals]
        if (newArray[index] == undefined){
            // If this index is undefined then create slots.
            // Fill the empty spots with undefined values.
            for (let i = 0; i < index + 1; i++){
                if (newArray[i] == undefined) {
                    newArray[i] = undefined;
                }
            }
        }
        setMeals(() => {
            const updatedArray = newArray.map((m, idx) => {
                if (idx == index) {
                    const hideFromDiary = newName? false: true; // If not name provided then hide from dairy.
                    return m == undefined? {
                        ...defaultDiaryGroupObject,
                        name: newName,
                        hideFromDiary: false
                    } : {...m, name: newName, hideFromDiary};
                } else return m;
            })
            return updatedArray
        })
    }

    const numberOfColumns = 2;
    const itemsPerColumn = 4;

    return (
        <Modal setShow={setShow} width={width} height={height} header={'Customize your meal names'}>
            <hr className="border border-primary border-3 opacity-75" />
            <div className="row mb-4">
                {Array.from({ length: numberOfColumns }).map((_, colIdx) => (
                    <div className="col-sm-6" key={colIdx}>
                        {Array.from({ length: itemsPerColumn }).map((_, itemIdx) => (
                            <div key={itemIdx} className="mb-1">
                                <p className="m-0">Meal {colIdx * itemsPerColumn + itemIdx + 1}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {(() => {
                                        const mealIdx = colIdx * itemsPerColumn + itemIdx
                                        const meal = meals[mealIdx];
                                        const isChecked = meal? !meal.hideFromDiary && meal.name: false;
                                        return (<>
                                            <input
                                            type="checkbox"
                                            className="form-check-input me-1"
                                            checked={isChecked}
                                            disabled={meal == undefined || !meal?.name}
                                            style={{height: '25px', width: '25px'}}
                                            onChange={e => toggleHideFromDiary(e, mealIdx)}
                                            />

                                            <input
                                            type="text"
                                            maxLength="20"
                                            className="form-control"
                                            value={meal?.name}
                                            onChange={e => changeMealName(e, mealIdx)}
                                            />
                                        </>)
                                        
                                    })()}
                                </div>
                            </div>
                        ))}
                    </div>
            ))}
            </div>
            {/* Set as default button */}
            <div className="d-flex justify-content-center align-content-center">
                <ResBtn
                    onClick={saveMealsSettings}
                    isResLoading={isResLoading}
                    isResSuccesful={isResSuccesful}
                    disabled={arraysAreEqual(prevSettings, determineSettings())}
                    btnText={'Set as default'}
                />
            </div>
        </Modal>
    )
}

export default SettingsModal;
