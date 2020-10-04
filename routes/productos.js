/**
 * Sólo la logica de ruteo
 */
var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosControllers');


/* GET users listing. */
router.get('/', productoController.getAll);


// Obtener un id especifico
router.get('/:id', productoController.getById);

/* POST users listing. */
// Creación de producto
// Para crear un producto el usuario debe estar logueado
router.post('/', (req, res, next) => {req.app.validateUser(req, res, next)}, productoController.create);

/* PUT users listing. */
// Editar/Atualizar el producto
router.put('/:id', productoController.update);


/* DELETE users listing. */
// Eliminar de producto
router.delete('/:id', productoController.delete);



module.exports = router;
