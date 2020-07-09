const express = require('express');
const Curso = require('../config/models/curso');
const Usuario = require('../config/models/usuario');
const  populate  = require('../config/models/curso');
const app = express() 


app.get('/curso', function(req,res ){
    Curso.find({}).populate('NumEstAsociados', 'nombre')



.exec((err,cursos)=>{
    if(err) {
        return res,status(400).json({
            ok:false,
            err
        })
    }
    res.json({
        ok: true,
        cursos
    });
})
});
app.post('/curso', function(req,res ){

    let body=req.body;

    let curso = new Curso({
        nombreCurso: body.nombreCurso,
        horario: body.horario,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin,
        numEstAsociados: body.numEstAsociados
    });

    curso.save((err,cursoDB)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: cursoDB
        })
    });
    
})
app.put('/curso/:id', function(req,res ){
    
    let id= req.params.id;
    let body =req.body;

    Curso.findByIdAndUpdate(id,body,{new: true}, (err,cursoDB)=>{

        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            curso:cursoDB
        });
    });


})
app.delete('/curso', function(req,res ){
    let id = req.params.id;
    Curso.findByIdAndRemove(id, (err,Deleted)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(!Deleted) {
            if (err){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Usuario no encontrado'
                    }
                }); 
            }
        }
        res.json({
            ok:true,
            curso:Deleted
        })
    })})


module.exports = app;