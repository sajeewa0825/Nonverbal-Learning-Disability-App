const express = require('express');
const userRouter = express.Router();
const userRegister = require('./controlers/userRegister');
const userLogin = require('./controlers/userLogin');
const passwordResetReq = require('./controlers/passwordResetReq');
const passwordReset = require('./controlers/passwordReset');
const multer = require('multer');


const upload = multer({
  dest: 'uploads/'
}); // multer configuration

userRouter.post('/register', upload.any(), userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/passwordresetreq',passwordResetReq) 
userRouter.post('/passwordreset',passwordReset)

module.exports = userRouter;