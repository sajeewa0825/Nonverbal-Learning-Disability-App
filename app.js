const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./user/user.routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// for parsing application/json
app.use(express.json());

app.use(express.urlencoded({
  extended: false,
  limit: '50mb',
  parameterLimit: 2
}));




// // for parsing multipart/form-data
// app.use(bodyParser.urlencoded({ extended: false }))

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_DB_URL, {})
  .then((res) => {
    console.log('Connected to Mongo DB');
  })
  .catch((err) => {
    console.log(err);
  });

// Models
require('./model/userModel');
require('./model/tokenModel');

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: '404 not found',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
