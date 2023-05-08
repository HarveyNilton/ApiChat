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



const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {isConnected} = req.body
    const result = await User.update(
        {isConnected},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { userName, isConnected} = req.body
    const user = await User.findOne({ where:{userName}})
    if(!user){
      
        const result = await User.create(
            {
                userName,
                isConnected
            });

            const token = jwt.sign(
                {result},
                process.env.TOKEN_SECRET,
                {expiresIn: "1d"}
            )
            return res.json({result, token}); 
      
    }
    
    await User.update({isConnected},{where:{userName}})
        const token = jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
            {expiresIn: "1d"}
        )
        return res.json({user, token}); 
    
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Messages.destroy({ where: {userId:id}});
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});


module.exports = {
    getAll,
    update,
    login,
    remove,

}