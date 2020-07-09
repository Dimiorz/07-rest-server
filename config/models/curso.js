const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Usuario = mongoose.model('Usuario');

let cursoSchema = new Schema({
    nombreCurso: {
        type: String,
        required: [true, 'nombre necesario']
    },
    horario: {
            type: String,
            required: [true, 'escriba si su horario es diruno o nocturno']
        },
    fechaInicio:{
        type: String,
    },
    fechaFin:{
        type: String,
    },
    NumEstAsociados:
    [{ type: Schema.ObjectId, ref: Usuario }]
    
});


module.exports = mongoose.model('Curso', cursoSchema)