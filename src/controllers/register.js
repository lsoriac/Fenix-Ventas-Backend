const RegisterControl = {};
const bcrypt = require('bcryptjs')
const pool = require("../database/database")
require('dotenv').config();

RegisterControl.createUser = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONT);
    try {
        const { nombre, contrasena, usuario } = req.body
            //encrypt
        contra = bcrypt.hashSync(contrasena, 10)
        var values = [
                [nombre, contra, usuario]
            ]
            //query database
        await pool.query("INSERT INTO usuarios (nombre, contrasena, usuario) VALUES ?", [values], (error, result) => {
            res.json({
                status: true,
                message: "Usuario Registrado de forma correcta",
                //registros: result //check info to send
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Error al registrar en la Base de datos',
            error
        })
    }
    //close connnection
    pool.end()

}


module.exports = RegisterControl