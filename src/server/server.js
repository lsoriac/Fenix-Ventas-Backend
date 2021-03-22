const express = require('express')
require('./config/config')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//initializations
const app = express()


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    //settings

//Middelwares
app.use(morgan('dev'));



//Routes
//login
app.use('/login', require('../routes/login'))
app.use('/register', require('../routes/register'))
app.use('/ventas', require('../routes/ventas'))

//Starting server
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})