import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import AuthForm from "../components/AuthForm";

const Signup = ({setAuthorized}) => {
    return (
        <AuthForm
            action={'signup'}
            title={'Create Your Free Account'}
            btnText={'SIGN UP'} 
            setAuthorized={setAuthorized}
        />
    )
}

export default Signup
