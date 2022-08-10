const mongoose = require("mongoose");

const productServiceSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    tipo: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('productService',productServiceSchema);