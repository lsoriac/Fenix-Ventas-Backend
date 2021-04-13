//Import modules
const express = require('express')
const router = express.Router();
const { createUser } = require('../controllers/register');
router.route('/')
    .post(createUser) //create new User

module.exports = router;