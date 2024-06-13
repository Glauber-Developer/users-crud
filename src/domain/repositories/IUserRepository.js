class IUserRepository {
    async save(user) {
        throw new Error('Método não implementado');
    }

    async findById(userId) {
        throw new Error('Método não implementado');
    }

    async update(user) {
        throw new Error('Método não implementado');
    }

    async delete(userId) {
        throw new Error('Método não implementado');
    }

    async findAll() {
        throw new Error('Método não implementado');
    }
}

module.exports = IUserRepository;
