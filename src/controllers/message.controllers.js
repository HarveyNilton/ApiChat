
const Messages = require('../models/Messages.model');
const User = require('../models/User.model');
const catchError = require('../utils/catchError');


const getAll = catchError(async(req, res) => {
   // const id = req.user.id;
    const results = await Messages.findAll({
        include:[User]
    }/*{where: {userId: id}}*/);
    return res.json(results);
});

const create = catchError(async(req, res) => {
   // const userId = req.user.id;
    //console.log(userId);
    const {message,userId} = req.body;
    const result = await Messages.create({message,userId});
    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create,
}