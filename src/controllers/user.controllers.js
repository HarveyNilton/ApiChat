const Messages = require('../models/Messages.model');
const User = require('../models/User.model');
const catchError = require('../utils/catchError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAll = catchError(async(req, res) => {
    const results = await User.findAll({
        include: [Messages]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {userName} = req.body
    const user = await User.findOne({where:{userName}})
    if(user) return res.status(500).json({ message:`El ${userName} ya se encuentra registrado`});
    const encriptedPassword = await bcrypt.hash(userName, 10)
    const result = await User.create(
        {
            userName,
            password: encriptedPassword
        });
    return res.status(201).json({message: 'Se ha registrado correctamente'});
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id,{
        include: [Messages]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName} = req.body
    const result = await User.update(
        {firstName, lastName},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { userName, isConnected} = req.body
    const user = await User.findOne({ where:{userName}})
    if(!user) return res.status(401).json({ message:`${userName} not exists`});
    const isValid = await bcrypt.compare(userName, user.password)
    if(!isValid) return res.status(401).json({ message:`${userName} is invalid`});
    await User.update({isConnected},{where:{userName}})
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    return res.json({user, token});
});

const getLogerUser = catchError(async(req, res) => {
    const user = req.user
    return res.json(user);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    getLogerUser
}