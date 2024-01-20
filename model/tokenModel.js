const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '3m',
  },
});

const tokenModel = mongoose.model("resettoken",tokenSchema)
module.exports = tokenModel;