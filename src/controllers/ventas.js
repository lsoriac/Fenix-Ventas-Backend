const VentasControl = {}
const pool = require("../../database")

VentasControl.getVentas = async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    try {
        //query database
        await pool.query('select * FROM ventasreporte ', (err, result, fields) => {
            res.json({
                status: true,
                message: "Registros Encontrados",
                registros: result,
                //num: result.length
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Error al obtener registros de la Base de datos',
            error
        })
    }
    //close connnection
    pool.end()
}
module.exports = VentasControl