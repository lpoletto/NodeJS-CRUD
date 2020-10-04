/**
 * Modelo: logica de interaccion con bbdd
 */

const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');

// Definimos la estructura
const usuariosSchema = new mongoose.Schema({
    nombre : {
        type: String,
        required : [true, 'El campo nombre es obligatorio'],
        minlength : 1,
        maxlength : 100
    },
    email : {
        type : String,
        required : [true, 'El campo email es obligatorio'],
        unique : true // para que email sea único
    },
    contraseña : {
        type : String,
        required : [true, 'El campo contraseña es obligatorio']
    }
});

// Encriptación de la contraseña
usuariosSchema.pre("save", function(next){
    this.contraseña = bcrypt.hashSync(this.contraseña, 10)
    next();
});

// Validaciones de email y contraseña
usuariosSchema.path("email").validate( function(value){
    const emailValidate = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    if(!emailValidate) return false;
}, "El email ingresado no es válido");

usuariosSchema.path("contraseña").validate( function(value){
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value);
}, "La contraseña debe contener al menos 1 número, 1 minúscula, 1 mayúscula, y 6 caracteres");

// Generamos el modelo
module.exports = mongoose.model("usuarios",usuariosSchema);