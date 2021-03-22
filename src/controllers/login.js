const LoginControl = {}
const pool = require("../../database")
const bcrypt = require('bcryptjs')

LoginControl.login = async(req, res) => {
    let body = req.body;
    console.log(body.usuario);
    await pool.query("SELECT * FROM usuarios WHERE usuario =" + '"' + body.usuario + '"', (error, userDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (userDB.length == 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //Verify password  
        if (!bcrypt.compareSync(body.contrasena, userDB[0].contrasena)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }

        //delete params resp(userDB) 
        delete userDB[0].contrasena
        delete userDB[0].idusuarios

        //resp
        res.json({
            status: true,
            message: "Usuario Correcto",
            usuario: userDB //check info to send
        })
    })
}


module.exports = LoginControl