import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";

const AuthForm = ({action, title, btnText}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(`/auth/${action}/`, {username, password});
            localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            navigate("/");
        } catch (error) {
            const updatedErrors = [];
            if (action == 'signup'){
                if (error.status == 409){
                    updatedErrors.push("A user with that username already exists.");
                }
            }
            if (action == 'login'){
                if (error.status == 401){
                    updatedErrors.push("Wrong credentials.");
                }
            }
            
            setErrors(updatedErrors);
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
                    <h2 className="font-weight-bold text-center mb-3">{title}</h2>
                    {errors.length > 0 && 
                        errors.map((err, idx) => {
                            return (
                            <div className="alert alert-danger" role="alert" key={idx}>
                                {err}
                            </div>)
                        })
                    }
                    <form onSubmit={handleSubmit} method="POST">
                        <label htmlFor="username" className="form-label font-weight-bold">Username</label>
                        <input id="username" type="text" className="form-control mb-3" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
                        <label htmlFor="password" className="form-label font-weight-bold">Password</label>
                        <input id="password" type="password" className="form-control mb-5" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                        <button className="btn d-block btn-primary mx-auto" style={{width: "80%"}} type="submit">
                            {loading?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                `${btnText}`
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AuthForm;
