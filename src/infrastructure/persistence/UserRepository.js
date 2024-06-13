const IUserRepository = require('../../domain/repositories/IUserRepository');

class UserRepository extends IUserRepository {
    constructor() {
        super();
        this.users = new Map();
    }

    async save(user) {
        this.users.set(user.id, user);
        return user;
    }

    async findById(userId) {
        return this.users.get(userId);
    }

    async update(user) {
        if (!this.users.has(user.id)) {
            throw new Error('Usuário não encontrado');
        }
        this.users.set(user.id, user);
        return user;
    }

    async delete(userId) {
        return this.users.delete(userId);
    }

    async findAll() {
        return Array.from(this.users.values());
    }
}

module.exports = UserRepository;
