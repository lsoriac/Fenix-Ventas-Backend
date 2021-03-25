//Import modules
const express = require('express')
const router = express.Router();
const { getVentas } = require('../controllers/ventas');
const { verificarToken } = require('../middlewares/autentication');
router.route('/')
    .get([verificarToken], getVentas)

module.exports = router;