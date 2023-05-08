const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('users', {
    userName:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    isConnected:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = User;