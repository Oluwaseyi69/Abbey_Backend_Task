const UserModel = require('../model/UserModel')

class UserRepository {
    async create(user) {
        return await UserModel.create(user);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findById(id){
        return await UserModel.findById ({id});
    }
    async findByRole(){
        return await UserModel.findByRole ({role})
    }
    async findByUsername(username){
        return await UserModel.findByUsername ({username})
    }
}

module.exports = new UserRepository();
