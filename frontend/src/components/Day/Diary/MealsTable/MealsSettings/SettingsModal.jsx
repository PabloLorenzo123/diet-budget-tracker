import { useState, useEffect } from "react";
import Modal from "../../../../Modal";
import { maxNumberOfMeals } from "../../../../../constants";
import { roundTo } from "../../../../../lib/functions";

const SettingsModal = ({setShow, width, height, meals}) => {
    const [mealNames, setMealNames] = useState([]); // Create 8 empty strings.

    useEffect(() => {
        const populateMealNames = () => {
            const populatedMealNames = Array.from({length: maxNumberOfMeals}, () => '')
            meals.forEach((m, idx) => populatedMealNames[idx] = m.name);
            setMealNames(populateMealNames);
        }
        populateMealNames();
    }, [])

    const numberOfColumns = 2;
    const itemsPerColumn = 4;

    return (
        <Modal setShow={setShow} width={width} height={height} header={'Customize your meal names'}>
            <hr className="border border-primary border-3 opacity-75" />
            <div className="row">
                <div className="col-sm-6">
                {[1, 2, 3, 4].map((i => {
                    return (<p>{i}</p>)
                }))}
                </div>
            </div>
        </Modal>
    )
}

export default SettingsModal;
