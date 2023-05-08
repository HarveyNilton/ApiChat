const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Messages = sequelize.define('messages', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Messages;