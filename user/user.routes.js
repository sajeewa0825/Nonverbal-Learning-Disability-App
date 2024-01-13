const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');
const userLogin = require('./controlers/userLogin');

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)

module.exports = userRouter;