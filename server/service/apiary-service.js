
const apiaryModel = require('../models/apiary-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const hiveModel = require('../models/hive-model')

class ApiaryService{
    async getAll(nickname){
        const userData = await userModel.findOne({nickname})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }
        const apiaries = await apiaryModel.find({user_id: userData._id})
        return apiaries
    }
    async add(nickname, name){
        const userData = await userModel.findOne({nickname})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        return await apiaryModel.create({user_id: userData._id, name})
    }

    async get(id){
        let apiaryData = await apiaryModel.findById(id)
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }
        const hivesData = await hiveModel.find({apiary_id: id}) || []
        const apiary = {_id: apiaryData.id, name:apiaryData.name, hives: hivesData}
        return apiary
    }
    async set(id, name) {
        const apiaryData = await apiaryModel.findOne({_id: id})
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }
        apiaryData.name = name
        return apiaryData.save();
    }
    async delete(id){
        await hiveModel.deleteMany({apiary_id: id})
        const apiaryData = await apiaryModel.findByIdAndDelete(id)
        return apiaryData
    }
}

module.exports = new ApiaryService()