//Import modules
const express = require('express')
const router = express.Router();
const { updatePass } = require('../controllers/recover');
router.route('/')
    .post(updatePass)

module.exports = router;