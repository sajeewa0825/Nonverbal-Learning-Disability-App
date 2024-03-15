const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');
const userLogin = require('./controlers/userLogin');
const passwordResetReq = require('./controlers/passwordResetReq');
const passwordReset = require('./controlers/passwordReset');
const pin = require('./controlers/pin');



userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/passwordresetreq',passwordResetReq) 
userRouter.post('/passwordreset',passwordReset)
userRouter.get('/pin',pin)

module.exports = userRouter;