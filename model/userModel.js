const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    Fname:{
        type:String,
        required:true,
    },

    Lname:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true, 
        unique:true
    },

    password:{
        type:String,
        required:true, 
    },

    profilePhoto: {
        data: Buffer,
        contentType: String
      },

    resetCode:{
        type:Number
    }
},{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel

