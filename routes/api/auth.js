const express = require('express')
const router = express.Router()
const auth = require('../../midleware/auth')
const { check } = require('express-validator/check');

const { signIn, getUserWithoutPassword } = require('../../controller/user.controller')

router.get('/', auth, getUserWithoutPassword)
router.post('/', [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], signIn)

module.exports = router;