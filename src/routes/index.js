const express = require('express');
const userRouter = require('./user.router');
const messageRouter = require('./message.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/api/v1/users', userRouter)
router.use('/api/v1/messages', messageRouter)


module.exports = router;