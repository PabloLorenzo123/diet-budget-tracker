
const NavBar = () => {

    return(
    <>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">DietBudgeter</a>
                
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    
    </>)
}

export default NavBar;
