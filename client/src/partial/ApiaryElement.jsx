import React from 'react';
import {Link} from "react-router-dom";

function ApiaryElement(props) {
    return (
        <div className="col mb-2">
            <Link to={"/apiary/" + props.apiary._id}>
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="images/apiary.png"/>
                        <span>{props.apiary.name}</span>
                    </div>
                </button>
            </Link>
        </div>
    );
}

export default ApiaryElement;