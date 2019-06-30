const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../midleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check');


const User = require('../../models/User')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        console.log(user)
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})


router.post('/', [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ errors: [{ msg: "Password error" }] })

        const payload = { user: { id: user.id } }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

module.exports = router;