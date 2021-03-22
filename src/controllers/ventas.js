const VentasControl = {}
const pool = require("../../database")

VentasControl.getVentas = async(req, res) => {
    try {
        //query database
        await pool.query('select * FROM ventasreporte ', (err, result, fields) => {
            res.json({
                status: true,
                message: "Registros Encontrados",
                registros: result,
                num: result.length
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