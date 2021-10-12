const userModel = require("../models/user-model");
const UserDto = require("../dtos/userDtos");

class UserServices {

    async findUser(filter) {
        const user = await userModel.findOne(filter);
        return user;
    }
    async createUser(data) {
        const user = await userModel.create(data);
        return user;
    }
    async getAllUsers(types) {
        const users = await userModel.find({ activated: { $in: types } });
        const userDto = users.map((user) => new UserDto(user))
        return userDto;
    }
}

module.exports = new UserServices();