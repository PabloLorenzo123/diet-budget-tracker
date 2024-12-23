import {Navigate, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN, USER } from '../constants';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import LoadingSpinner from './LoadingSpinner';

import { toast } from 'react-toastify';
import { use } from 'react';

const ProtectedRoute = ({authorized, setAuthorized, children, currentPath, setCurrentPath}) => {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // When a user clicks a link in the navbar the currentPath changes, then auth() is run again.
    // currentPath changes when the user clicks a link in the navbar.
    useEffect(() => {
        auth().catch(() => setAuthorized(false));
    }, [currentPath])
    
    const logout = () => {
        localStorage.removeItem(USER);
        setAuthorized(false); // This will make the '/' default route be equal to the homepage.
        toast.info("Your session expired, you need to log in again.");
        navigate('/');
    }

    const refreshToken = async (user) => {
        const refreshToken = user[REFRESH_TOKEN];
        try {
            const res = await api.post("/auth/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status == 200){
                localStorage.setItem(USER, {
                    ...USER,
                    [ACCESS_TOKEN]: res.data.access
                });
                setAuthorized(true);
            } else {
                logout();
            }
        } catch (error) {
            console.log(error);
            logout();
        }
    }

    const auth = async () => {
        console.log('auth is running')
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem(USER));
            if (!user) {
                logout();
                return;
            }
            const token = user[ACCESS_TOKEN];
            if (!token){
                setAuthorized(false);
                logout();
                return;
            }
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000
            
            if (tokenExpiration < now){
                await refreshToken(user);
            } else {
                setAuthorized(true);
            }

        } catch {
            setAuthorized(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath}/>
            
            <div id='app'>
               {!loading && authorized ? children: <LoadingSpinner />}
            </div>
        </>
    )
}

export default ProtectedRoute
