const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1m',
  },
});

const tokenModel = mongoose.model("resettoken",tokenSchema)
module.exports = tokenModel;