const nodemailer = require("nodemailer")
require('dotenv').config();

const sendMail = async (to, subject, text) =>{
    console.log(process.env.EMAIL);
    console.log(to)
    console.log(subject)
    console.log(text)
    var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PW
        }
      });

    await transport.sendMail({
        to:to,
        from:process.env.EMAIL,
        text:text,
        subject:subject
    }).then((res) => {
        res.satus(200).json({
            message:"Email sent successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            message:"Email not send, Internal Server Error"
        })
    });
}

module.exports = sendMail;