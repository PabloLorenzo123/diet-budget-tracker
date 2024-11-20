import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";

const MealsSettingsBtn = ({meals, setMeals}) => {
    const [showModal, setShowModal] = useState(false);

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
            />
        }
        </>
    )
}

export default MealsSettingsBtn;
