const express = require('express')
const router = express.Router()
const auth = require('../../midleware/auth')
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile.modal')
const User = require('../../models/User')

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ User: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: "no profile for this user" })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
})

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'skill is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profileField = {}
    profileField.user = req.user.id;
    if (company) profileField.company = company
    if (website) profileField.website = website
    if (location) profileField.location = location
    if (bio) profileField.bio = bio
    if (status) profileField.status = status
    if (githubusername) profileField.githubusername = githubusername
    if (skills) {
        profileField.skills = skills.split(',').map(skill => skill.trim());
    }

    profileField.social = {}
    if (youtube) profileField.social.youtube = youtube;
    if (twitter) profileField.social.twitter = twitter;
    if (facebook) profileField.social.facebook = facebook;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (instagram) profileField.social.instagram = instagram;

    try {
        //update
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileField },
                { new: true }
            )
            return res.json(profile)
        }

        //create 
        profile = new Profile(profileField)
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }

})
module.exports = router;
