import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";

const Login = () => {

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
        <div className="d-flex bg-dark p-3 mb-5">
            <a href="/" className="text-decoration-none"><h1 className="text-white">DietBudgeter</h1></a>
        </div>

        <div id="content">
            <div id="form" className="mx-auto p-5 border border-2 shadow" style={{maxWidth: '500px'}}>
                <h2 className="font-weight-bold text-center mb-3"> Welcome back</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="username" className="form-label font-weight-bold">Username</label>
                    <input id="username" type="text" className="form-control mb-3" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
                    <label htmlFor="password" className="form-label font-weight-bold">Password</label>
                    <input id="password" type="password" className="form-control mb-5" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                    <button className="btn d-block btn-primary mx-auto" style={{width: "80%"}} type="submit">LOG IN</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login
