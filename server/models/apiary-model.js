const {Schema, model} = require("mongoose")

const ApiarySchema = new Schema({
    name: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Apiary', ApiarySchema);