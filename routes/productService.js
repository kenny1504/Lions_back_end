const express  = require("express");
const router = express.Router();
const  productServiceSchema = require("../models/productService");
const auth = require("../middleware/auth");

// save producto or service
router.post('/productServices', auth, (req,res)=> {
    const productService= productServiceSchema(req.body);
    productService.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

// get all producto and service
router.get('/productServices',auth, (req,res)=> {

    productServiceSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})


// get producto or service
router.get('/productServices/:id', auth, (req,res)=> {

    const {id} = req.params;
    productServiceSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

// update producto or service
router.put('/productServices/:id', auth, (req,res)=> {
    const {id} = req.params;
    const {nombre, precio, tipo, existencia } = req.body;
    productServiceSchema
        .updateOne({_id:id}, {$set:{nombre, precio, tipo, existencia}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})


// delete producto or service
router.delete('/productServices/:id', auth, (req,res)=> {
    const {id} = req.params;
    productServiceSchema
        .remove({_id:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

module.exports = router;