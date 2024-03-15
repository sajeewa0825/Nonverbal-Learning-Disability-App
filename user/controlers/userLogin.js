const mongoose = require('mongoose');
const jwtManager = require('../../manager/jwt');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const userModel = mongoose.model("user");

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please enter all fields"
        });
    }

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid Credentials"
            });
        }

        const accessToken = jwtManager(user);
        console.log(user);
        const _data = {
            name: user.name,
            email: user.email,
            _id: user._id
        }

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                user: _data,
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
}

module.exports = userLogin;