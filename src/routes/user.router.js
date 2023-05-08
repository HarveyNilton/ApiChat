const express = require('express');
const { getAll, create, getOne, remove, update, login, getLogerUser } = require('../controllers/user.controllers');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)
    .post(create);

userRouter.route('/login')
    .post(login)

userRouter.route('/me')
    .get( verifyJWT,getLogerUser)

userRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = userRouter;