const User = require('../../domain/entities/User');

class CreateUserUseCase {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    async execute(userDto) {
        const user = new User(userDto.id, userDto.name, userDto.email);

        if (!user.isValid()) {
            throw new Error('Usuário inválido');
        }

        const savedUser = await this.userRepository.save(user);
        await this.emailService.sendEmail(user.email, 'Bem-vindo!', 'Obrigado por se registrar!');

        return savedUser;
    }
}

module.exports = CreateUserUseCase;
