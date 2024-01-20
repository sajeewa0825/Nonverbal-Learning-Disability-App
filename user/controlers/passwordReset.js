const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const passwordReset = async (req, res) => {
    const { email, code, password, } = req.body;

    if (!email || !password || !code) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const tokenModel = mongoose.model("resettoken");
        const datareset = await tokenModel.findOne({ email: email });
        if (!datareset) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(code, datareset.token);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        } else {
            const userModel = mongoose.model("user");
            const user = await userModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const hash = await bcrypt.hash(password, 10);
            const newUser = await userModel.findByIdAndUpdate(user._id, {
                password: hash,
            });

            const query = { _id: datareset._id };
            await tokenModel.deleteOne(query);

            res.status(200).json({
                status: "success",
                message: "Password reset successfully",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        });
    }
}





module.exports = passwordReset;