const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check');

const { createNewUser } = require('../../controller/user.controller')

router.post('/', [
    check("name", "name is required")
        .not()
        .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], createNewUser)
module.exports = router;
