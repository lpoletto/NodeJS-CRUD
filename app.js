var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// NUEVO SERVICIO
var productosRouter = require('./routes/productos'); 

var app = express();

// Secret key: defininda
app.set('secretKey', 'dn2020');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definición de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
// NUEVO SERVICIO
app.use('/productos', productosRouter); 
/**
 *  Si quiero que la ruta completa sea solo accedida solo por usuario autenticados
 * coloco el validateUser en "app.js"
 * Y si es una accion especifica de esa ruta, voy a la ruta en cuestion y valido la accion. 
 * EJ: productos --> POST
 */
//app.use('/productos', validateUser, productosRouter); // aplica la validacion para todas las rutas de producto

// Validar un token para acceder a una determinada ruta
function validateUser(req, res, next){
  // validamos el token
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
    if(err){
      
      res.json({message:err.message});

    } else {

      req.body.tokenData = decoded;
      next();
    
    }
  })
}

// Para que app.js utilice a la funcion validateUser
app.validateUser = validateUser;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // Renderiza un html
  //res.render('error');
  res.json({error : err.message})
});

module.exports = app;
