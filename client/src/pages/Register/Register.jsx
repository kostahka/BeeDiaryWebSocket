import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {socket} from "../../http";

function Register(props) {
    const [credentials, setCredentials] = useState({
        nickname: undefined,
        password: undefined,
        confirmPassword: undefined
    })

    const {loading, error, dispatch, user} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            if(credentials.password === credentials.confirmPassword)
            {
                await AuthService.registration(credentials.nickname, credentials.password, false)
            }else{
                dispatch({type: "LOGIN_FAILURE", payload: Error("Passwords are not equal")})
            }
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response?err.response.data:err})
        }
    }

    useEffect(() => {
        if(user)
            navigate('/')
        else
            dispatch({type: 'LOGOUT'})
    }, [])

    return (
        <div>
            <div className="container bg-dark d-flex flex-column p-5 w-50 align-items-center">
                <div className="w-100">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Nickname</span>
                        <input type="text" id="nickname" className="form-control"
                               onChange={handleChange}/>
                    </div>
                    <span className="text-warning mb-2"> - Password must be length from 3 to 32</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Password</span>
                        <input type="password" id="password" className="form-control"
                               onChange={handleChange}/>
                    </div>
                    <div className="input-group mb-4">
                        <span className="input-group-text">Confirm password</span>
                        <input type="password" id="confirmPassword" className="form-control"
                               onChange={handleChange}/>
                    </div>
                    <button className="btn btn-outline-warning w-100"
                            onClick={handleClick}>Register</button>
                </div>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !loading?"hidden":"visible"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
            </div>
        </div>
    );
}

export default Register;