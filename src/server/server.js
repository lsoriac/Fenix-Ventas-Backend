const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

//initializations
const app = express()


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    //settings

//Middelwares
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/login', require('../routes/login'))
app.use('/register', require('../routes/register'))
app.use('/recover', require('../routes/recover'))
app.use('/ventas', require('../routes/ventas'))

//Starting server
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})