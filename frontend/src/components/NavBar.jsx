import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import favicon from '../assets/favicon-32x32.png';

import { appName, navbarZIndex, USER } from "../constants";

const NavBar = ({currentPath, setCurrentPath}) => {
   
    const navigate = useNavigate();

    const goTo = (path) => {
        setCurrentPath(path);
        navigate(path);
    }

    const isCurrentPath = (path) => path == currentPath;
    const username = JSON.parse(localStorage.getItem(USER)).username
    return(
    <>
        <nav
            className="navbar navbar-expand-sm bg-dark border-bottom border-body fixed-top"
            data-bs-theme="dark"
            role="navigation"
            style={{zIndex: navbarZIndex}
        }>
            <div className="container-fluid">

                <button
                    className={`nav-link navbar-brand d-flex align-items-end ${isCurrentPath('/')? 'active': ''}`}
                    onClick={() => goTo('/')}
                >
                    <img src={favicon} className="me-2" alt="logo"/>
                    {appName}
                    
                </button>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ms-auto me-1">
                        <li className="nav-item">
                            <button
                                className={`nav-link d-flex align-items-center ${isCurrentPath('/dietplans')? 'active': ''}`}
                                onClick={() => goTo('/dietplans')}
                            >
                                Diet Plans
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link d-flex align-items-center ${isCurrentPath('/food-products')? 'active': ''}`}
                                onClick={() => goTo('/food-products')}
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                <span className="ms-2">Your Food Products</span>
                            </button>
                        </li>

                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle"role="button" data-bs-toggle="dropdown" aria-expanded="false">                                
                                <span>{username}</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className='nav-link dropdown-item'
                                        onClick={() => goTo('/logout')}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    
    </>)
}

export default NavBar;
