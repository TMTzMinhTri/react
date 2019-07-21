const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const twillio = require('twilio')
const randomstring = require('randomstring')
const User = require('../models/User')
const { validationResult } = require('express-validator/check');

module.exports = {
    createNewUser: async (req, res) => {
        const errors = validationResult(req)
        const { name, email, password } = req.body

        //validate form
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        //create user
        try {
            let user = await User.findOne({ email })
            if (user)
                return res.status(400).json({ errors: [{ msg: "User already exists" }] })

            const avata = gravatar.url(email, { s: "200", r: "x", d: "mm" })

            user = new User({ name, email, avata, password })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();

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
    },
    signIn: async (req, res) => {
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
                res.cookie("token", token, { signed: true })
                res.json({ token })
            })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("server error")
        }
    },
    getUserWithoutPassword: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password")
            res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error")
        }
    },
    sendSmsCode: async (req, res) => {
        const accountSid = config.get('twillioSID')
        const authToken = config.get('twillioAuthToken')
        const client = twillio(accountSid, authToken)
        const number = randomstring.generate({
            length: 4,
            charset: 'numeric'
        });
        const phoneNumber = req.body.phoneNumber

        try {
            let result = await client.messages.create({
                body: number,
                from: '+18632044402',
                to: phoneNumber
            })
            if (result) {
                res.json({ msg: "success" })
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error")
        }

    }
}