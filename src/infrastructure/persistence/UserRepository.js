const IUserRepository = require('../../domain/repositories/IUserRepository');
const UserModel = require('./models/UserModel');

class UserRepository extends IUserRepository {
    async save(user) {
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    async findById(userId) {
        const user = await UserModel.findByPk(userId);
        return user;
    }

    async update(user) {
        const [rowsUpdated, [updatedUser]] = await UserModel.update(user, {
            where: { id: user.id },
            returning: true
        });
        if (rowsUpdated === 0) {
            throw new Error('Usuário não encontrado');
        }
        return updatedUser;
    }

    async delete(userId) {
        await UserModel.destroy({ where: { id: userId } });
    }

    async findAll() {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = UserRepository;
