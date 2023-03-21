import {createContext, useEffect, useReducer} from "react"
import {AuthReducer, INITIAL_STATE} from "../redux/AuthReducer";
import {API_URL, socket, socketPrivate} from "../http";

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    socket.on('error', (error) => {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    })

    const authUser = (userData) => {
        state.callback && state.callback(userData)
        dispatch({type: "LOGIN_SUCCESS", payload: userData})
        localStorage.setItem("accessToken", userData.accessToken)
        localStorage.setItem("refreshToken", userData.refreshToken)
        socketPrivate.connect(API_URL + "/private/")
    }

    socket.on('users:login', authUser)
    socket.on('users:register', authUser)
    socket.on('users:refresh', authUser)

    socket.on('users:logout', () => {
        state.callback && state.callback()
        socketPrivate.disconnect()
    })

    return (
        <AuthContext.Provider
            value={{
                user:state.user,
                loading: state.loading,
                error:state.error,
                refreshToken: state.refreshToken,
                dispatch}
            }>
            {children}
        </AuthContext.Provider>
    )
}