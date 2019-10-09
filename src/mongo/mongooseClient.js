const mongoose = require('mongoose');
let mongoURI = "mongodb+srv://gabo:123456a@cluster0-tjuco.mongodb.net/alumnos?retryWrites=true&w=majority"


mongoose.connect(mongoURI,{useNewUrlParser : true, useUnifiedTopology: true});
console.log(mongoose.connection.readyState);


const db = mongoose.connection;

db.on('error', () => console.log('Conexion a base de datos fallida'))
    .once('open', () => console.log("Conectado a base de datos"))