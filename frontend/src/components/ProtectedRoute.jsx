import {Navigate, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({authorized, setAuthorized, children, currentPath, setCurrentPath}) => {
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        auth().catch(() => setAuthorized(false));
    }, [])

    // When a user clicks a link in the navbar the currentPath changes, then auth() is run again.
    useEffect(() => {
        auth().catch(() => setAuthorized(false));
    }, [currentPath])
    
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/auth/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status == 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setAuthorized(false);
        }
    }

    const auth = async () => {
        setLoading(true);
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token){
            setAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000
        
        if (tokenExpiration < now){
            await refreshToken();
        } else {
            setAuthorized(true);
        }
        setLoading(false);
    }

    return (
        <>
            <NavBar currentPath={currentPath} setCurrentPath={setCurrentPath}/>
            <div id='app'>
                {!loading?
                    children:
                    <LoadingSpinner />
                }
            </div>
        </>
    )
}

export default ProtectedRoute
