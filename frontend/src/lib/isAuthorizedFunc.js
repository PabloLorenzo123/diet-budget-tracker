import { ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import { jwtDecode } from 'jwt-decode';

export const isAuthorized = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    // If no access token exists, authorization is not possible
    if (!accessToken) return false;

    try {
        const decoded = jwtDecode(accessToken);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        // If token is expired, attempt to refresh
        if (tokenExpiration < now) {
            if (!refreshToken) return false;

            const res = await api.post("/auth/token/refresh/", { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                return true;
            }
            return false;
        }

        // Token is valid
        return true;
    } catch (error) {
        console.error("Authorization check failed:", error);
        return false;
    }
}
