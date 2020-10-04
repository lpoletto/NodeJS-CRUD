/**
 * Modelo: logica de interaccion con bbdd
 */

const mongoose = require('../bin/mongodb');

// Tags
const tagsSchema = new mongoose.Schema({
    nombre : String
})

// Definimos la estructura
const productosSchema = new mongoose.Schema({
    nombre : {
        type : String,
        required : [true, 'El campo nombre es obligatorio'], // campo requerido
        minlength : 1,
        maxlength : 100
    },

    sku : {
        type : String,
        required : [true, 'El campo SKU es obligatorio'],
        unique : true // campo único
    },

    descripcion : String,

    precio: {
        type : Number,
        min : 1,
        // Precio guardado sin IVA. Cuando lo devuelvo le aplico el IVA
        get :  function(precio) {
            return precio * 1.21;
        }
    },

    cantidad : {
        type : Number,
        min : 1
    },

    categoria : {
        type : mongoose.Schema.ObjectId,
        ref : 'categorias' // Referencia con la coleccion que se relaciona
    },

    tags : [tagsSchema]
});

// Getters : modifica el dato a la hora de devolverlo.
// Setters : modifica el dato a la hora de actualizarlo o guardarlo
// Virtuals : atributos virtuales. Ejemplo para mandar nombre y apellido juntos
productosSchema.virtual('precioMoneda').get(function(){
    return '$ ' + this.precio;
})
productosSchema.set('toJSON', {getters : true, virtuals : true});
// Generamos el modelo
module.exports = mongoose.model("productos",productosSchema);
