import {createContext, useEffect, useReducer} from "react"

export const INITIAL_STATE = {
    user: (localStorage.getItem("user") !== "undefined"?JSON.parse(localStorage.getItem("user")):null) || null,
    loading: false,
    error: null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    callback: null
}

export const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
                refreshToken: null,
                callback: action.payload
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                loading: false,
                error: null,
                refreshToken: action.payload.refreshToken,
                callback: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
                refreshToken: null,
                callback: null
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
                refreshToken: null,
                callback: action.payload
            }
        default:
            return state
    }
}