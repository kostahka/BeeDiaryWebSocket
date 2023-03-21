
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-exception')

class UserService{
    async registration(nickname, password, isAdmin){
        const candidate = await UserModel.findOne({nickname})
        if(candidate){
            throw ApiError.BadRequest('User with nickname ' + nickname + ' is already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserModel.create({nickname, password: hashPassword, isAdmin})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
    async login(nickname, password){
        const user = await UserModel.findOne({nickname})
        if(!user){
            throw ApiError.BadRequest('No user with such nickname')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Incorrect password')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const tokenData = await tokenService.findToken(refreshToken)
        if(!userData || !tokenData){
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()