/**
 * Modelo: logica de interaccion con bbdd
 */

const mongoose = require('../bin/mongodb');

// Definimos la estructura
const categoriasSchema = new mongoose.Schema({
    nombreCategoria : {
        type : String,
        required : [true, 'El campo nombre es requerido'], // campo obligatorio
        minlength : 1,
        maxlength : 100
    }
});

// Generamos el modelo
module.exports = mongoose.model("categorias",categoriasSchema);
