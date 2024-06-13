class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    isValid() {
        // Adicione validações de usuário aqui
        return this.name && this.email;
    }
}

module.exports = User;
