const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const router = express.Router();
const productServicesRoute = require('./productService')
const loginRoute = require('./login')

//Midleware
// Add headers before the routes are defined
router.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Expose-Headers', 'x-access-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  // Pass to next layer of middleware
  next();
});
router.use(express.json());
router.use('/api',[productServicesRoute,loginRoute]);


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
