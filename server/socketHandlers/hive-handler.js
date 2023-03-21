const errorHandler = require("./error-handler");
const apiaryService = require('../service/apiary-service')
const hiveService = require('../service/hive-service')

module.exports = (io, socket) => {
    const getHive = async (id) => {
        try {
            const hive = await hiveService.get(id)
            socket.emit("hive:get", hive)
        }
        catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const addHive = async (id, count) => {
        try {
            const hives = await hiveService.add(id, count)
            const apiary = await apiaryService.get(id)
            socket.emit("apiary:get", apiary)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const setHive = async (hive) => {
        try {
            const hiveData = await hiveService.set(hive)
            socket.emit("hive:set", hiveData)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    const deleteHive = async (id) => {
        try {
            const hive = await hiveService.delete(id)
            socket.emit("hive:delete", hive)
        }catch (e){
            errorHandler.emitError(socket, e)
        }
    }

    socket.on("hive:get", getHive);
    socket.on("hive:set", setHive);
    socket.on("hive:add", addHive);
    socket.on("hive:delete", deleteHive);
}