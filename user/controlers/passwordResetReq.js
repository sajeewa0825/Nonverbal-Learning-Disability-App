const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendMail = require('../../manager/email');


const passwordResetReq = async (req, res) => {
    const { email } = req.body;
    const userModel = mongoose.model("user");

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User does not exist"
        });
    }

    const tokenModel = mongoose.model("resettoken");

    let resetToken = crypto.randomBytes(32).toString("hex");
    const expirationTime = Math.floor(Date.now() / 1000) + (3 * 60);
    const jwtToken = jwt.sign({ resetToken, exp: expirationTime }, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(jwtToken, 10);


    const newUser = await tokenModel.create({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    });


    const link = `http://localhost:3000/user/passwordreset?token=${resetToken}&id=${user._id}`;
    const emaildata = sendMail(user.email, "Password Reset Request", link);

    if(emaildata){
        res.status(200).json({
            status: "success",
            message: "Email sent successfully",
            data: {
                linkr: link,
            }
        });
    
    }

};

module.exports = passwordResetReq;