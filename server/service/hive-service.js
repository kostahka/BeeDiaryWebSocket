const hiveModel = require('../models/hive-model')
const ApiError = require('../exceptions/api-exception')

class HiveService{
    async get(id){
        const hiveData = await hiveModel.findById(id)
        if(!hiveData){
            throw ApiError.BadRequest('No such hive')
        }
        return hiveData
    }
    async set(hive){
        const hiveData = await hiveModel.findById(hive._id)
        if(!hiveData){
            throw ApiError.BadRequest('No such hive')
        }
        hiveData.type = hive.type
        hiveData.queen = hive.queen
        hiveData.performance = hive.performance
        return hiveData.save()
    }
    async add(id, count){
        const hives = []
        for(let i = 0; i < count; i++){
            const hive = await hiveModel.create({type: "None", queen: "None", performance: 0, apiary_id:id})
            hives.push(hive)
        }
        return hives
    }
    async delete(id){
        const hiveData = await hiveModel.findByIdAndDelete(id)
        return hiveData
    }
}

module.exports = new HiveService()