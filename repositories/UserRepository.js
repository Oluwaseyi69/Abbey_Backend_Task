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
    async findByIdAndUpdate(id, updateFields){
        return await UserModel.findByIdAndUpdate(id, updateFields, {new: true});
    }
   
    async delete(userId) {
    return await UserModel.findByIdAndDelete(userId);
    }
}

module.exports = new UserRepository();
