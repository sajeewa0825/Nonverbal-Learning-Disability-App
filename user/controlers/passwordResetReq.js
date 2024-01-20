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
    const datareset = await tokenModel.findOne({ email: email });
    if (datareset) {
        const query = { _id: datareset._id };
        await tokenModel.deleteOne(query);
    }

    //let resetToken = crypto.randomBytes(32).toString("hex");
    // const expirationTime = Math.floor(Date.now() / 1000) + (3 * 60);
    // const jwtToken = jwt.sign({ resetToken, exp: expirationTime }, process.env.JWT_SECRET);
    const randomDecimal = Math.random() * 90000;
    const resetcode = Math.floor(randomDecimal) + 10000;
    const code = resetcode.toString()
    const hash = await bcrypt.hash(code, 10);


    const newUser = await tokenModel.create({
        email: user.email,
        token: hash,
        createdAt: Date.now(),
    });


    //const link = `http://localhost:3000/user/passwordreset?token=${resetToken}&id=${user._id}`;
    const message = "Use your secret code! " + resetcode + "  If you did not forget your password, you can ignore this email.";

    const emaildata = sendMail(user.email, "NVLD App Password reset code", message);

    if (emaildata) {
        res.status(200).json({
            status: "success",
            message: "Email sent successfully",
            data: {
                Code: resetcode,
            }
        });

    }

};

module.exports = passwordResetReq;