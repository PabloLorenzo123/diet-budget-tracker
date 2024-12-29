import { appName } from '../../constants';
import favicon from '../../assets/favicon-100x100.png';

import { useNavigate } from 'react-router-dom';

const UnproctectedNav = () => {

    const navigate = useNavigate();

    return (
        <nav className="navbar custom-nav navbar-expand-lg navbar-dark fixed-top">
            <div className="container-fluid">

                <button
                    className="navbar-brand d-flex align-items-center bg-transparent border-0 p-0"
                    onClick={() => navigate('/')}
                >
                    <img src={favicon} width={85} height={85} className="me-2" alt="Logo" />
                    <h1 className="fw-bold m-0">{appName}</h1>
                </button>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item">
                            <button
                                className="btn btn-link nav-link text-white"
                                onClick={() => navigate('/login')}
                            >
                                Log In
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn nav-link text-white px-sm-4 rounded-pill"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default UnproctectedNav;