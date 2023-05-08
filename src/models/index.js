const Messages = require("./Messages.model");
const User = require("./User.model");


Messages.belongsTo(User)
User.hasMany(Messages)

