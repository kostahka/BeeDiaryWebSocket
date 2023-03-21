const errorHandler = require("./error-handler");
const apiaryService = require('../service/apiary-service')

module.exports = (io, socket) => {
    const addApiary = async (nickname, name) => {
        try {
            const apiary = await apiaryService.add(nickname, name)
            const apiaries = await apiaryService.getAll(nickname)
            socket.emit("apiary:getAll", apiaries)
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const getAllApiaries = async (nickname) => {
        try {
            const apiaries = await apiaryService.getAll(nickname)
            socket.emit("apiary:getAll", apiaries)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }


    const getApiary = async (id) => {
        try {
            const apiary = await apiaryService.get(id)
            socket.emit("apiary:get", apiary)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const setApiary = async (id, name) => {
        try {
            const apiary = await apiaryService.set(id, name)
            socket.emit("apiary:get", apiary)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const deleteApiary = async (id) =>{
        try {
            const apiary = await apiaryService.delete(id)
            socket.emit("apiary:delete", apiary)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    socket.on("apiary:getAll", getAllApiaries);
    socket.on("apiary:get", getApiary);
    socket.on("apiary:set", setApiary);
    socket.on("apiary:add", addApiary);
    socket.on("apiary:delete", deleteApiary);
}