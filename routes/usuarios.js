const express = require('express');
const Usuario = require('../config/models/usuario')
const app = express() 


app.get('/usuario', function(req,res ){
       

    Usuario.find({})
    
    .populate('cursoAsociado', 'nombreCurso')
    .exec((err,usuarios)=>{
        if(err) {
            return res,status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok: true,
            usuarios
        });
    })
});
app.post('/usuario', function(req,res ){

    let body=req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad,
        correo: body.correo,
        cursoAsociado: body.cursoAsociado
    });

    usuario.save((err,usuarioDB)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
    
})
app.put('/usuario/:id', function(req,res ){
    
    let id= req.params.id;
    let body =req.body;

    Usuario.findByIdAndUpdate(id,body,{new: true}, (err,usuarioDB)=>{

        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });
})
app.delete('/usuario/:id', function(req,res ){

    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err,Deleted)=>{
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
            usuario:Deleted
        })
    })
})


module.exports = app;