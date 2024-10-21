import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return(
    <>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="nav-link navbar-brand" onClick={() => navigate('/')}>DietBudgeter</button>
                
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav ms-auto">
                        <li className="nav-item">
                            <button type="button" className="nav-link d-flex align-items-center justify-content-between"
                            onClick={() => navigate('/create-food-product')}>
                                <span className="material-symbols-outlined">
                                    menu_book
                                </span>
                                <span className="ms-2">Create Food Product</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="nav-link" onClick={() => navigate('/logout')}>Logout</button>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    
    </>)
}

export default NavBar;
