var express = require('express');
var router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');


/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource GET');
}); */

/* POST users listing. */
router.post('/registro', usuariosControllers.registro);
router.post('/login', usuariosControllers.login);

module.exports = router;
