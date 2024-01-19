const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const sendMail = require('../../manager/email');


const passwordReset = async (req, res) => {
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
    const hash = await bcrypt.hash(resetToken, 10);


    const newUser = await tokenModel.create({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    });


    const link = `http://localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
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

module.exports = passwordReset;