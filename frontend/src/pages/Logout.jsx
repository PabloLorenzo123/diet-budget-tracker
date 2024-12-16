import { Navigate } from "react-router-dom";

const Logout = ({setAuthorized}) => {
    localStorage.clear();

    setAuthorized(false);
    
    return <Navigate to="/" />
}

export default Logout
