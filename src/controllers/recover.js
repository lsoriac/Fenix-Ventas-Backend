const RecoverControl = {};
const pool = require("../database/database")
var generator = require('generate-password');
const nodemailer = require('nodemailer');
require('dotenv').config();

RecoverControl.updatePass = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONT);
    try {
        const { email } = req.body;
        var password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true
        });
        //find email and change password
        await pool.query("UPDATE `usuarios` SET `contrasena` =" + "'" + password + "'" + " WHERE (`email` = '" + email + "')", (error, userDB) => {
            //error sql
            if (error) {
                return res.status(400).json({
                    status: false,
                    error
                });
            }
            //not find an user whit this email
            if (userDB['affectedRows'] === 0) {
                return res.status(400).json({
                    status: false,
                    error: {
                        //developer "(Usuario) o contraseña incorrectos"
                        message: "No se encontró ningún usuario asociado al correo"
                    }
                });
            }

            //Content email message
            contentHTML = `
        <h1>Para ingresar a su cuenta use la siguiente contraseña</h1>
       
        <p>${password}</p>
            `;
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                service: 'Gmail',
                // true for 465, false for other ports
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASS_EMAIL
                }
            });
            transporter.sendMail({
                from: '"Recuperar Contraseña Fenix Ventas" <lenisantiagos@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Recuperación de Contraseña",
                html: contentHTML, // html body
            })


            res.json({
                status: true,
                message: "Modificación exitosa",
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Error al modificar en la Base de datos',
            error
        })
    }
    //close connnection
    pool.end()
}

module.exports = RecoverControl