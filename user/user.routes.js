const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');
const userLogin = require('./controlers/userLogin');
const passwordReset = require('./controlers/passwordResetReq');

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/resetpassword',passwordReset) 

module.exports = userRouter;