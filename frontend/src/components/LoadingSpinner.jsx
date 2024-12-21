
const LoadingSpinner = ({width=100, height=100}) => {
    
    return (   
        <div
            className='d-flex justify-content-center align-items-center'
            style={{height: '100%'}}
        >
            <div
            className="spinner-border text-primary"
            style={{width, height}}
            role="status"
            >
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner;
