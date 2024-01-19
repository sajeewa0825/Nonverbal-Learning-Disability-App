const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');
const userLogin = require('./controlers/userLogin');
const passwordResetReq = require('./controlers/passwordResetReq');
const passwordReset = require('./controlers/passwordReset');

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/resetpassword',passwordResetReq) 
userRouter.post('/passwordreset',passwordReset)

module.exports = userRouter;