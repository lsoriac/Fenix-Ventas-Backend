const express = require('express')
require('./config/config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

//initializations
const app = express()


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    //settings

//Middelwares
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(morgan('dev'));

//Routes
app.use('/login', require('../routes/login'))
app.use('/register', require('../routes/register'))
app.use('/ventas', require('../routes/ventas'))

//Starting server
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})