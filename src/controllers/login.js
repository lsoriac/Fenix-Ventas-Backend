const LoginControl = {}
const pool = require("../../database")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

LoginControl.login = async(req, res) => {
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
                    //developer
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //Verify password  
        if (!bcrypt.compareSync(body.contrasena, userDB[0].contrasena)) {

            return res.status(400).json({
                status: false,
                error: {
                    //developer
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }
        //delete params resp(userDB) 
        delete userDB[0].contrasena
        delete userDB[0].idusuarios

        let token = jwt.sign({
            user: userDB[0]
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN = 60 * 60 });

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