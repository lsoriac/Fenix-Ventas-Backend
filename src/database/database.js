const mysql = require("mysql")
const { promisify } = require("util")

//credentials
database = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB
}

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("LA CONEXIÓN CON LA BASE DE DATOS SE CERRÓ");
        }
        if (err.code === "ERR_CON_COUNT_ERROR") {
            console.error("LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES");
        }
        if (err.code === "ECONREFUSED") {
            console.error("LA CONEXIÓN CON LA BASE DE DATOS HA SIDO RECHAZADA");
        }
    }
    if (connection) connection.release()
    console.log("Conexión Exitosa con la Base de datos");
    return
})

//async
pool.query = promisify(pool.query).bind(pool)
module.exports = pool