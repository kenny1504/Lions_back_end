const mongoose = require("mongoose");

const productServiceSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
        minLength: 0
    },
    existencia: {
        type: Number,
        required: true,
        minLength: 0
    },
    tipo: {
        type: Number,
        required: true
    },
},
    { timestamps: true,
});

module.exports = mongoose.model('productService',productServiceSchema);