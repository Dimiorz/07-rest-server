require('./config/config')

const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const mongoose = require('mongoose')



//parsr application/x-www-form-urlencodes
app.use(bodyparser.urlencoded({extended: false}))

//parse aplication/json
app.use(bodyparser.json())


app.use(require('./routes/usuarios'))
app.use(require('./routes/cursos'))

mongoose.connect('mongodb://localhost:27017/rest-api', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
 
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, ()=>{
    console.log('escuchando puerto ', 3000);
});