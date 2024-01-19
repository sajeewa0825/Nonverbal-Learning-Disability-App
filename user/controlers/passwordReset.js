const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const passwordReset = async (req, res) => {
    const { token, id } = req.query;

    if (!token || !id) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Request"
        });
    }

    const tokenModel = mongoose.model("resettoken");
    resetData = await tokenModel.findOne({ userId: id });
    if (!resetData) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Request"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Token has expired');
            } else {
                console.error('Token verification failed:', err.message);
            }
            return res.status(400).json({
                status: "fail",
                message: "Invalid Request"
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "Valid Request"
            });
        }
    });
    const isMatch = await bcrypt.compare(token, resetData.token);

}

module.exports = passwordReset;