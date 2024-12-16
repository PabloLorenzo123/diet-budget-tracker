
const LoadingSpinner = () => {
    return (   
        <div
            className='d-flex border justify-content-center align-items-center'
            style={{height: '100%'}}
        >
            <div
            className="spinner-border text-primary"
            style={{width: '100px', height: '100px'}}
            role="status"
            >
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner;
