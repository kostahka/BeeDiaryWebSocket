import React, {useContext, useEffect, useState} from 'react';
import ApiaryElement from "../../partial/ApiaryElement";
import {AuthContext} from "../../contexts/AuthContext";
import {socket, socketPrivate} from "../../http";
import {useNavigate} from "react-router-dom";

function ApiaryList(props) {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [apiaryName, setApiaryName] = useState('')

    const [apiaries, setApiaries] = useState([])

    const {user, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setApiaryName(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault()

        setLoading(true)
        socketPrivate.emit("apiary:add", user?.nickname, apiaryName)
        socketPrivate.emit("apiary:getAll", user.nickname)
    }

    useEffect(()=>{
        setLoading(true)
        if(!user){
            navigate('/login')
        }
        socketPrivate.emit("apiary:getAll", user?.nickname)
    }, [])

    const apiaryGetAllListener = (apiaries) =>{
        setApiaries(apiaries)
        setError(null)
        setLoading(false)
    }

    const errorListener = (err) => {
        setError(err)
    }

    useEffect(() => {
        socketPrivate.on('apiary:getAll', apiaryGetAllListener)
        socketPrivate.on('error', errorListener)
        return () => {
            socketPrivate.off('apiary:getAll', apiaryGetAllListener)
            socketPrivate.off('error', errorListener)
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column justify-content-start align-items-center">
                <span className="text-warning text-center mb-4 h4">New apiary</span>
                <div className="d-flex flex-column w-100">
                    <div className="input-group mb-2">
                        <span className="input-group-text bg-dark text-warning border-warning">Apiary name</span>
                        <input type="text" className="form-control" onChange={handleChange}/>
                    </div>

                    <button className="btn btn-outline-warning" onClick={handleClick}>Add apiary</button>
                </div>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !isLoading?"hidden":"visible"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
            </div>
            <div className="row row-cols-6">
                {apiaries.map((apiary)=>
                    <ApiaryElement key={apiary._id} apiary={apiary}/>
                )}
            </div>
        </div>
    );
}

export default ApiaryList;