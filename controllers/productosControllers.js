/**
 * Toda la logica de negocio de la app
 */
const productosModels = require('../models/productosModels');
const categoriaModels = require('../models/categoriasModel');

module.exports = {
    // Retornamos todos los productos
    getAll : async(req, res, next) => {
        try {
            //productosModels.find({condiciones})
            //const  productos = await productosModels.find({}).populate('nombre del campo que quiero relacionar');
            const  productos = await productosModels.find({}).populate('categoria');
            
            // Si queremos buscar por el subdocumento
            //const  productos = await productosModels.find({"tags.nombre" : "Monitores"}).populate('categoria');

            
            // Devolvemos en formato JSON
            res.json(productos);
            
        } catch (error) {
            console.log(error);
        }
    },


    // Retornamos en base a un id
    getById : async(req, res, next) => {
        // req.params.id: Variable donde queda guardados los parametros resividos desde la url
        // con este dato, debería buscarlo en la bbdd
        //console.log(req.params.id);
        try {
            const producto = await productosModels.findById(req.params.id).populate('categoria');
    
            res.json(producto);
            
        } catch (error) {
            next(error);
        }
    },


    // Creamos un elemento
    create : (req, res, next) => {
        /**
         * req.body: es donde recibo toda la info que se va insertar en mi ddbb
         */
        console.log(req.body);
        try {
            const producto = new productosModels({
                nombre : req.body.nombre,
                sku : req.body.sku,
                descripcion : req.body.descripcion,
                precio: req.body.precio,
                cantidad : req.body.cantidad,
                categoria : req.body.categoria,
                tags : req.body.tags
            });
    
            // Almacenamos el producto en la bbdd
            producto.save();
            // Lo devuelvo en formato json
            res.json(producto);
            
        } catch (error) {
            next(error);
        }
    },


    // Actualizamos un elemento
    update : async(req, res, next) => {
        /**
         * req.params.id : el producto que voy a actualizar
         * req.body : los datos que voy a actualiar
         * multi : false --> Actualiza solo un documento
         * multi : true --> Actualiza todos los docs que cumplan con la condicion
         */
        
        try {
            //console.log(req.params.id, req.body);
            const producto = await productosModels.update({_id : req.params.id}, req.body, {multi : false})
            res.json(producto);
            
        } catch (error) {
            next(error);
        }
    },


    // Eliminar un elemento
    delete : async(req, res, next) => {
        try {
            //console.log(req.params.id);
            const producto = await productosModels.deleteOne({_id : req.params.id}) 
            res.json(producto);
        } catch (error) {
            next(error);
        }
    }
}