const express = require('express');
const router = express();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');


router.post('/login', function (req, res) {

    let body = req.body;

    User.findOne({ usuario: body.usuario }, (erro, usuarioDB)=>{
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }
        // Verifica que exista un usuario con el nombre escrito.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }
        // Válida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        // Genera el token de autenticación
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTHENTICATION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })
    })
})

// registrar un nuevo usuario
router.post('/register', function (req, res) {
    let body = req.body;
    let { usuario, password, role } = body;
    let user = new User({
        usuario,
        password: bcrypt.hashSync(password, 10),
        role
    });
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});


module.exports = router;

