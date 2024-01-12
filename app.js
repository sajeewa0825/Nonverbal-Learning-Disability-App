require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const userRouter = require('./user/user.routes');
const cors = require('cors');

const app = express();
app.use(cors())

mongoose.connect(process.env.MONGO_DB_URL,{}).then(((res) => {
    console.log('Connected to Mongo DB');
})).catch((err) => {
    console.log(err);
});

// Models
require('./model/userModel');

// Middlewares
app.use(express.json());
// Routes
app.use("/user",userRouter)

app.all("*", (req, res, next) =>{
    res.status(404).json({
      status:"fail",
      message:"404 not found"
    })
  })

app.use(express.json());


app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})