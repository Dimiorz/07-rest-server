const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, ' el nombre es requerido']
    },
    apellido:{
        type: String,
        required: [true, ' el apellido es requerido']
    },
    edad:{
        type: Number,
        required: [true, ' la edad es requerida']
    },
    correo:{
        type: String,
        required: [true, ' el correo es requerido']
    },
    cursoAsociado:
    [{ type: Schema.ObjectId, ref: 'Curso' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema)