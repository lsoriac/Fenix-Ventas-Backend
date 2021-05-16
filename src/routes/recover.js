//Import modules
const express = require('express')
const router = express.Router();
const { updatePass, sendEmail } = require('../controllers/recover');
router.route('/')
    .put(updatePass)
    .post(sendEmail)

module.exports = router;