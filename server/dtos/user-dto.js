module.exports = class UserDto{
    nickname;
    id;
    isAdmin;

    constructor(model) {
        this.nickname = model.nickname
        this.id = model._id
        this.isAdmin = model.isAdmin
    }
}