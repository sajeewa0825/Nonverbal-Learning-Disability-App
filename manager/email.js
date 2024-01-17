const nodemailer = require("nodemailer")
require('dotenv').config();

const sendMail = async (to, subject, text) => {

    var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
        }
    });

    await transport.sendMail({
        to: to,
        from: process.env.EMAIL,
        text: text,
        subject: subject
    }).then((res) => {
        console.log(res);

    }).catch((err) => {
        console.log(err);
    });
}

module.exports = sendMail;