const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const router = express.Router();
const productServicesRoute = require('./productService')

//Midleware
router.use(express.json());
router.use('/api',productServicesRoute);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//MongoDb coneccion
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('conected True DB ATLAS'))
    .catch((error) => console.log(error));

module.exports = router;
