const {Schema, model} = require("mongoose")

const HiveSchema = new Schema({
    type: {type: String, required: true},
    queen: {type: String, required: true},
    performance: {type: Schema.Types.Number, required: true},
    apiary_id: {type: Schema.Types.ObjectId, ref: 'Apiary'},
    number: {type:  Schema.Types.Number}
})

module.exports = model('Hive', HiveSchema);