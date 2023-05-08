
const Messages = require('../models/Messages.model');
const User = require('../models/User.model');
const catchError = require('../utils/catchError');


const getAll = catchError(async(req, res) => {
    const id = req.user.id;
    const results = await Messages.findAll({
        include:[User]
    }/*{where: {userId: id}}*/);
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const {message} = req.body;
    const result = await Messages.create({message,userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Messages.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Messages.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    
    const result = await Messages.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}