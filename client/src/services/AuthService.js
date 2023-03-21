import {socket} from "../http/index"

export default class AuthService{
    static async login(nickname, password){
        socket.emit("users:login", nickname, password)
    }
    static async registration(nickname, password, isAdmin){
        socket.emit("users:registration", nickname, password, isAdmin)
    }
    static async logout(refreshToken){
        localStorage.removeItem('accessToken')
        socket.emit("users:logout", refreshToken)
    }
}