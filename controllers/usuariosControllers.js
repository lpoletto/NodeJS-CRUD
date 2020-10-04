/**
 * Logica de negocio de la app
 */

const usuariosModels = require('../models/usuariosModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // Registramos un usuario
    registro : (req, res, next) => {
        //req.body: es donde recibo toda la info que se va insertar en mi ddbb
        console.log(req.body);
        try {
            const usuario = new usuariosModels({
                nombre : req.body.nombre,
                email : req.body.email,
                contraseña : req.body.contraseña
            });

            usuario.save(); // grabamos en bbdd
            res.json(usuario)

        } catch (error) {
            next(error);
        }
    },

    
    // Login de usuario
    login : async(req, res, next) => {
        try {
            // Retornamos un token
            const usuario = await usuariosModels.findOne({email : req.body.email})
            
            if(usuario){
                //bcrypt.compareSync(lo que manda el usuario, contraseña encriptada)
                //Middleware
                if(bcrypt.compareSync(req.body.contraseña, usuario.contraseña)){
                    // Si son iguales tanto email como el password
                    // generamos el token
                    const token = jwt.sign({usuarioId : usuario._id}, req.app.get('secretKey'));
                    
                    // Devolvemos el token
                    res.json({token : token}); // Ahora React o Angular almacenan el token en el LocalStorage (servicios privados)
                }else {
                    res.json({error : 'La constrseña es incorrecta'});    
                }
            } else{
                res.json({error : 'El email no está registrado'});
            }
        } catch (error) {
            next(error);
        }
    }
};