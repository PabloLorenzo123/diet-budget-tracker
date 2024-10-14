import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/auth/login/", {username, password});
            localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm