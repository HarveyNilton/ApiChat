const express = require('express');
const { getAll, getOne, remove, update, login, getLogerUser } = require('../controllers/user.controllers');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)

userRouter.route('/login')
    .post(login)

userRouter.route('/:id')
    .put(update);

module.exports = userRouter;