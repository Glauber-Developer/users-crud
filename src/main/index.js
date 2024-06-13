require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../config/database');
const UserRepository = require('../infrastructure/persistence/UserRepository');
const EmailService = require('../infrastructure/email/EmailService');
const CreateUserUseCase = require('../app/use_cases/CreateUserUseCase');
const GetUserUseCase = require('../app/use_cases/GetUserUseCase');
const UpdateUserUseCase = require('../app/use_cases/UpdateUserUseCase');
const DeleteUserUseCase = require('../app/use_cases/DeleteUserUseCase');
const UserController = require('../interface_adapters/controllers/UserController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const userRepository = new UserRepository();
const emailService = new EmailService();

const createUserUseCase = new CreateUserUseCase(userRepository, emailService);
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
);

app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/users/:id', (req, res) => userController.getUser(req, res));
app.put('/users', (req, res) => userController.updateUser(req, res));
app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});
