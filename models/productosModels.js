/**
 * Modelo: logica de interaccion con bbdd
 */

const mongoose = require('../bin/mongodb');

// Definimos la estructura
const productosSchema = new mongoose.Schema({
    nombre : String,
    sku : String,
    descripcion : String,
    precio: Number,
    cantidad : Number
});

// Generamos el modelo
module.exports = mongoose.model("productos",productosSchema);
