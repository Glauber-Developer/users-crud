class UserController {
    constructor(createUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async createUser(req, res) {
        try {
            const userDto = req.body;
            const user = await this.createUserUseCase.execute(userDto);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.getUserUseCase.execute(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const userDto = req.body;
            if (!userDto.id) {
                throw new Error('ID do usuário é necessário');
            }
            const user = await this.updateUserUseCase.execute(userDto);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await this.deleteUserUseCase.execute(userId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
