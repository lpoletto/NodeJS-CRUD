/**
 * Conexión a la bbdd
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_db', {useNewUrlParser : true}, (error)=>{
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});

module.exports = mongoose;