const mongoose = require('mongoose');
const jwtManager = require('../../manager/jwt');
const bcrypt = require('bcrypt');
const sendMail = require('../../manager/email');

const userRegister = async (req, res) => {
    //console.log(req.body);
    const { Fname, Lname, email, password } = req.body;
    const userModel = mongoose.model("user");

    if (!Fname || !Lname || !email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please enter all fields"
        });
    }

    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            Fname: Fname,
            Lname: Lname,
            email: email,
            password: hash
        });

        const accessToken = jwtManager(newUser);

        const email = await sendMail(email, "Welcome to our website", "Welcome to our website");

        res.status(200).json({
            status: "success",
            message: "User registered successfully",
            email: email,
            data: {
                user: newUser,
                accessToken: accessToken
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error"
        });
    }
};

module.exports = userRegister;
