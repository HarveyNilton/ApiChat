const express = require('express');
const { getAll, update, login, remove} = require('../controllers/user.controllers');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)

userRouter.route('/login')
    .post(login)

userRouter.route('/:id')
    .put(update)
    .delete(remove);


module.exports = userRouter;