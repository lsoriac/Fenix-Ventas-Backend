//Import modules
const express = require('express')
const router = express.Router();
const { getVentas } = require('../controllers/ventas');
router.route('/')
    .get(getVentas)

module.exports = router;