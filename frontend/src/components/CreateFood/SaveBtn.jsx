import { useState } from "react";

const SaveBtn = () => {
    
    const submit = () => {

    }


    return (
        <div className="d-flex justify-content-end">
            <button type="button"
            className="btn btn-primary"
            style={{width: '100px'}}
            onClick={submit}>
                Save
            </button>
        </div>
    )
}

export default SaveBtn;