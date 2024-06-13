class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        return await this.userRepository.delete(userId);
    }
}

module.exports = DeleteUserUseCase;
