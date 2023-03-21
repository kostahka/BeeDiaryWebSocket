const userService = require('../service/user-service')
const errorHandler = require('../socketHandlers/error-handler')

module.exports = (io, socket) => {
    const login = async (nickname, password) => {
        try {
            const userData = await userService.login(nickname, password)
            socket.emit("users:login", userData)
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const registration = async (nickname, password, isAdmin) => {
        try {
            const userData = await userService.registration(nickname, password, isAdmin)
            socket.emit("users:registration", userData)
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const logout = async (refreshToken) => {
        try {
            const tokenData = await userService.logout(refreshToken)
            socket.emit("users:logout")
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const refresh = async (refreshToken) => {
        try {
            const userData = await userService.refresh(refreshToken)
            socket.emit("users:refresh", userData)
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    socket.on("users:login", login);
    socket.on("users:registration", registration);
    socket.on("users:logout", logout);
    socket.on("users:refresh", refresh);
}