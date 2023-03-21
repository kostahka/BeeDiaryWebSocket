import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const {user, dispatch, refreshToken} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleClick = async (e)=>{
        e.preventDefault()

        try {
            dispatch({type: 'LOGOUT'})
            await AuthService.logout(refreshToken)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container-fluid px-0">
            <header
                className="d-flex flex-wrap align-items-center justify-content-md-between p-3 mb-4 bg-dark border-bottom">
                <Link to="\"
                   className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h1 className="text-warning">Bee diary</h1>
                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-warning">Home</Link></li>
                    <li><Link to="/apiaries" className="nav-link px-2 link-light">Apiaries</Link></li>
                </ul>

                <div className="col-md-2 text-end">
                    {user ?
                        (<button onClick={handleClick} className="btn btn-outline-warning">Logout</button>)
                        :
                        (
                            <div className="input-group">
                                <Link to="/login" className="btn btn-outline-warning">Login</Link>
                                <Link to="/register" className="btn btn-warning">Sign-up</Link>
                            </div>
                        )
                    }
                </div>
            </header>
        </div>
    );
}

export default Header;