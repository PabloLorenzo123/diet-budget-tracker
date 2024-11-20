

const ResBtn = ({onClick, disabled, isResLoading, isResSuccesful, btnText}) => {
    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={onClick}
            disabled={disabled}
            >
            {isResLoading?
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                isResSuccesful?
                <span className="material-symbols-outlined text-dark" style={{color: 'white'}}>
                    check_circle
                </span>:
                `${btnText}`
            }         
        </button>
    )
}

export default ResBtn;
