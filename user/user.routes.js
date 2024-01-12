const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');

userRouter.post('/register',userRegister)

module.exports = userRouter;