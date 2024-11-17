import { useState, useEffect } from "react";
import Modal from "../../../../Modal";

const SettingsModal = ({setShow, width, height}) => {
    const [mealNames, setMealNames] = useState([]);

    return (
        <Modal
            setShow={setShow}
            width={width}
            height={height}
            header={'Customize your meal names'}
        >
            <hr className="border border-primary border-3 opacity-75" />

        </Modal>
    )
}

export default SettingsModal;
