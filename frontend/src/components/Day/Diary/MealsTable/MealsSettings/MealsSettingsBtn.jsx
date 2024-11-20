import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";

const MealsSettingsBtn = ({meals, setMeals}) => {
    const [showModal, setShowModal] = useState(false);

    const determineSettings = () => meals.map(m => m?.name); // Function that creates the criteria of the current value of the settings.

    const [prevSettings, setPrevSettings] = useState(() => {
        return determineSettings(); // Returns a list of the meal names if the object has a meal attribute.
    });


    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
        <button className="bg-transparent border-0 p-0" onClick={toggleModal}>
            <span className="material-symbols-outlined">
                settings
            </span>
        </button>

        {showModal && 
            <SettingsModal
                width={'50%'}
                height={'60%'}
                setShow={setShowModal}
                meals={meals}
                setMeals={setMeals}
                prevSettings={prevSettings}
                setPrevSettings={setPrevSettings}
                determineSettings={determineSettings}
            />
        }
        </>
    )
}

export default MealsSettingsBtn;
