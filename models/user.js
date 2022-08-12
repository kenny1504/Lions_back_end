const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN", "TRABAJADOR"],
    message: '{VALUE} no es un role válido'
}

const userSchema = mongoose.Schema({
        usuario: {
            type: String,
            required: [true, 'El nombre de usuario es necesario'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
        },
        role: {
            type: String,
            default: 'TRABAJADOR',
            required: [true, 'Enumerables validos '+rolesValidos.values],
            enum: rolesValidos,
        },
        },
        { timestamps: true,
});

// Elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: 'EL {PATH} debe de ser único, ya existe'
})
module.exports = mongoose.model('user',userSchema);