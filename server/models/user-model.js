const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    nickname: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

module.exports = model('User', UserSchema);