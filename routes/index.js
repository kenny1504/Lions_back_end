const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//MongoDb coneccion
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('conected Tru DB ATLAS'))
    .catch((error) => console.log(error));

module.exports = router;
