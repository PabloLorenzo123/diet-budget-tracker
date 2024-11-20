import { useState, useEffect } from "react";

const DaySwitcher = ({currentDay, setCurrentDay}) => {

    const navButtonsStyle = {width: '50%'};
    return (
        <>
        <h6 className="text-center fw-bold">Day {currentDay + 1}</h6>
        <div className="bg-secondary d-flex justify-content-center">
            {/* Previous button */}
            <button
            type="btn"
            className="btn btn-secondary"
            style={navButtonsStyle}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </div>
            </button>
            {/* Next button */}
            <button
            type="btn"
            className="btn btn-secondary"
            style={navButtonsStyle}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <span class="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
            </button>
        </div>
        
        </>
    )
}

export default DaySwitcher;
