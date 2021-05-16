const LoginControl = {}
const pool = require("../database/database")
const jwt = require('jsonwebtoken');
require('dotenv').config();

LoginControl.login = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONT);
    let body = req.body;
    await pool.query("SELECT * FROM usuarios WHERE usuario =" + '"' + body.usuario + '"', (error, userDB) => {
        if (error) {
            return res.status(400).json({
                status: false,
                error
            });
        }
        if (userDB.length == 0) {
            return res.status(400).json({
                status: false,
                error: {
                    //developer "(Usuario) o contraseña incorrectos"
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        //Verify password  
        if (body.contrasena !== userDB[0].contrasena) {
            return res.status(400).json({
                status: false,
                error: {
                    //developer "Usuario o (contraseña) incorrectos"
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        //delete params resp(userDB) 
        delete userDB[0].contrasena
        delete userDB[0].idusuarios

        let token = jwt.sign({
            user: userDB[0]
        }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });

        //resp
        res.json({
            status: true,
            message: "Usuario Correcto",
            usuario: userDB, //check info to send
            token
        })
    })
}

module.exports = LoginControl