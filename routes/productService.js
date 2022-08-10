const express  = require("express");
const router = express.Router();
const  productServiceSchema = require("../models/productService");

// save producto or service
router.post('/productServices', (req,res)=> {
    const productService= productServiceSchema(req.body);
    productService.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

// get all producto and service
router.get('/productServices', (req,res)=> {

    productServiceSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})


// get producto or service
router.get('/productServices/:id', (req,res)=> {

    const {id} = req.params;
    productServiceSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

// update producto or service
router.put('/productServices/:id', (req,res)=> {
    const {id} = req.params;
    const {nombre, precio, tipo } = req.body;
    productServiceSchema
        .updateOne({_id:id}, {$set:{nombre, precio, tipo}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})


// delete producto or service
router.delete('/productServices/:id', (req,res)=> {
    const {id} = req.params;
    productServiceSchema
        .remove({_id:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

module.exports = router;