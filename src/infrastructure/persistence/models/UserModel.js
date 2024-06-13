const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = UserModel;
