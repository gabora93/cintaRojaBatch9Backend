var express = require('express');
const mongoose = require("./src/mongo/mongooseClient");
const bodyParser = require('body-parser');
var app = express();
const Alumno = require('./src/models/alumnoModel');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//GET
app.get('/', function(req,res){
    res.send('Hola mundo desde express con nodemon otro cambio');
});

//CREAR ALUMNO (CREATE)
app.post('/api/v1/alumno/crear', (req,res) => {

    const { nombre, apellido, edad, email, ciudad} = req.body

    let nuevoAlumno = Alumno({
        nombre,
        apellido,
        edad,
        email,
        ciudad
    })

    nuevoAlumno.save((error, success) => {
        if(error ) throw error;
        res.status(201).send(success);
    })

})

//VER ALUMNOS  (READ)

app.get('/api/v1/alumno/all', (req,res) => {

    Alumno.find()
        .then(alumnos => {
            res.status(200).send(alumnos)
        })
        .catch(error => {
            res.status(404).send(error);
        })
})

// VER ALUMNO POR ID ( READ BY ID)

app.get('/api/v1/alumno/:id', (req,res) => {
    let { id } = req.params;

    Alumno.findById(id)
        .then(alumno =>{
            res.status(200).send(alumno);
        }).catch(error =>{
            res.status(404).send(error);
        })
})

// ACTUALIZAR ALUMNO (UPDATE)

app.put('/api/v1/alumno/update/:id', (req,res) => {
    let {id} = req.params;
    const {nombre, apellido, edad, email, ciudad} = req.body;

    let alumnoUpdated ={
        nombre,
        apellido,
        edad,
        email,
        ciudad
    }


    Alumno.findByIdAndUpdate(id, alumnoUpdated, {new: true})
        .then(alumnoActualizado => {
            res.status(200).send(alumnoActualizado)
        })
        .catch(error => {
            res.status(404).send(error);
        })

})

// ELIMINAR ALUMNO (DELETE)
app.delete('/api/v1/alumno/:id', (req,res) => {
    console.log(req)
    let { id } = req.params;
    Alumno.findByIdAndDelete(id)
        .then(alumnoBorrado => {
            res.status(200).send(alumnoBorrado)
        }).catch(error => {
            res.status(404).send(error);
        })
})


app.post('/', (req,res) =>{
    res.send("Hola mundo desde el POST");

})


app.put('/', (req,res)=>{
    res.send("Hola mundo desde PUT")
})

app.listen(6430, function(){
    console.log("Corriendo en el puerto 3000");
});


// PARAMS Y QUERY

//QUERY
app.get('/ejemplo', (req,res) => {
    console.log(req.query);
    
    let { ejem, otracosa } = req.query

    console.log(ejem)
    res.send(otracosa)

})

//http://localhost:3000/ejemplo?ejem="hola"

//PARAMS

app.get('/ejemploParams/:param1/:param2', (req,res)=>{
    let { param1, param2 } = req.params;

    res.send({param1,param2});
})
//http://localhost:3000/ejemploParams/hola/comoestas


// 1Crear la ruta /suma que reciba como path dos numeros y retorne la suma de ellos

// 2Crear la ruta /multiplicacion que reciba como query dos numeros y retorne la multiplicacion de ellos
// 3Crear la ruta /division que reciba como query dos numeros y retorne la division de ellos
// 4 Crear la ruta /saludo que reciba como param el nombre de la presona a saludar e imprima "Hola <nombre>"
