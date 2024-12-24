import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN, USER } from "../constants";
import api from "../api";

const AuthForm = ({action, title, btnText, setAuthorized}) => {
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
            if (res.status == 200 || res.status == 201){
                localStorage.setItem(USER, JSON.stringify({
                    [ACCESS_TOKEN]: res.data.accessToken,
                    [REFRESH_TOKEN]: res.data.refreshToken,
                    username: res.data.username
                }))
                await setAuthorized(true);
                navigate("/");
            }
        } catch (error) {
            const updatedErrors = [];
            if (action == 'signup'){
                if (error.status == 409){
                    updatedErrors.push("A user with that username already exists.");
                } else {
                    updatedErrors.push(error.message);
                }
            }
            if (action == 'login'){
                if (error.status == 401){
                    updatedErrors.push("Wrong credentials.");
                } else {
                    updatedErrors.push(error.message);
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
            <nav className="main-nav">
                <div className='content'>
                    <div className="main-nav-left">
                        <button className='bg-transparent m-0 p-0 border-0' onClick={() => navigate('/')}>
                            <h1 className='fw-bold'>
                                Dietbudget
                            </h1>
                        </button>
                    </div>
                </div>
            </nav>

            <div id="hero">
                <div id="content" className="d-flex justify-content-center align-items-center" style={{width: '100%', height: '100%'}}>
                    <div id="form" className="p-5 border border-2 shadow" style={{width: '500px'}}>
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
            </div>
        </>
    )
}

export default AuthForm;
