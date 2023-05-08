const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, getOne, remove, update } = require('../controllers/message.controllers');

const messageRouter = express.Router();

messageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

messageRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = messageRouter;