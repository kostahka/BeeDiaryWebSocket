import React, {useContext, useEffect, useState} from 'react';
import HiveElement from "../../partial/HiveElement";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import {socketPrivate} from "../../http";

function Apiary(props) {
    const {id} = useParams()

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [count, setCount] = useState(1)
    const [name, setName] = useState("")

    const [apiary, setApiary] = useState({
        _id: null,
        name: "",
        hives: []
    })

    const {dispatch} = useContext(AuthContext)

    const handleApiaryChange = (e) => {
        setName(e.target.value)
    }

    const handleApiaryClick = async (e) => {
        e.preventDefault()

        socketPrivate.emit("apiary:set", id, name)
    }

    const handleHiveChange = (e) => {
        setCount(e.target.value)
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()

        setLoading(true)
        socketPrivate.emit("apiary:delete", id)
    }

    const handleHiveClick = async (e) => {
        e.preventDefault()

        setLoading(true)
        socketPrivate.emit("hive:add", id, count)
        socketPrivate.emit("apiary:get", id)
    }

    const navigate = useNavigate()

    const errorListener = (err) => {
        setError(err)
    }

    const apiaryGetListener = (apiary) => {
        setLoading(false)
        setApiary(apiary)
        setName(apiary.name)
        setError(null)
    }

    const apiaryDeleteListener = () => {
        setLoading(false)
        setError(null)
        navigate(-1)
    }

    useEffect(() => {
        socketPrivate.on('apiary:get', apiaryGetListener)
        socketPrivate.on('apiary:delete', apiaryDeleteListener)
        socketPrivate.on('error', errorListener)
        return () => {
            socketPrivate.off('apiary:get', apiaryGetListener)
            socketPrivate.off('apiary:delete', apiaryDeleteListener)
            socketPrivate.off('error', errorListener)
        }
    }, [])

    useEffect(()=>{
        setLoading(true)
        socketPrivate.emit("apiary:get", id)
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column align-items-center">
                <div className="d-flex flex-row justify-content-start w-100">
                    <div className="d-flex flex-column justify-content-start align-items-center w-100 mx-3">
                        <div className="input-group mb-2">
                            <span className="input-group-text">Name</span>
                            <input type="text" className="form-control" value={name} onChange={handleApiaryChange}/>
                        </div>
                        <button className="btn btn-outline-warning w-100 mb-2" onClick={handleApiaryClick}>Save</button>
                        <button className="btn btn-outline-danger w-100" onClick={handleDeleteClick}>Delete</button>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-center w-100">
                        <div className="input-group row-cols-3">
                            <span className="input-group-text bg-dark text-warning border-warning col-2">Count</span>
                            <input type="number" className="form-control col-1" value={count} onChange={handleHiveChange}/>
                            <button className="btn btn-warning col-5" onClick={handleHiveClick}>Add hives</button>
                        </div>
                    </div>
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
                {
                    apiary.hives.map(hive=>
                        <HiveElement key={hive._id} hive={hive}/>
                    )
                }
            </div>
        </div>
    );
}

export default Apiary;