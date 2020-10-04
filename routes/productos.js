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
// Para editar un producto el usuario debe estar logueado
router.put('/:id', (req, res, next) => {req.app.validateUser(req, res, next)}, productoController.update);


/* DELETE users listing. */
// Eliminar de producto
// Para eliminar un producto el usuario debe estar logueado
router.delete('/:id', (req, res, next) => {req.app.validateUser(req, res, next)}, productoController.delete);



module.exports = router;
