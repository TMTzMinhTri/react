const request = require('request')
const config = require('config')
const { validationResult } = require('express-validator/check');
const Profile = require('../models/Profile.modal')
const User = require('../models/User')


module.exports = {
    deleteUserAndProfile: async (req, res) => {
        try {
            await Profile.findOneAndRemove({ user: req.user.id })
            await User.findOneAndRemove({ _id: req.user.id })
            res.json({ msg: "User deleted" })

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    },
    getReposGithub: (req, res) => {
        try {
            const option = {
                uri: `https://api.github.com/users/${
                    req.params.username
                    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                        'githubClientID'
                    )}&&client_secret=${config.get('githubSecret')}`,
                method: 'GET',
                headers: { 'user-agent': 'node.js' }
            }
            request(option, (error, response, body) => {
                if (error) console.error(error)

                if (response.statusCode !== 200) {
                    return res.status(400).send({ msg: "No github profile found" })
                }
                res.json(JSON.parse(body))

            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },
    deleteEducationFieldByID: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            //remove index
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

            profile.education.splice(removeIndex, 1)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },
    deleteExperienceFieldByID: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            //remove index
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

            profile.experience.splice(removeIndex, 1)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },
    createEducationField: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            school,
            degree,
            from,
            fieldOfStudy,
            to,
            current,
            description
        } = req.body

        const newExp = {
            school,
            degree,
            from,
            to,
            fieldOfStudy,
            current,
            description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            if (!profile) {
                return res.status(400).json({ msg: "there is no profile for this user" })
            }
            profile.education.unshift(newExp)
            await profile.save();
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }

    },
    createExperienceField: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            title,
            company,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            from,
            to,
            current,
            description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            if (!profile) {
                return res.status(400).json({ msg: "there is no profile for this user" })
            }
            profile.experience.unshift(newExp)
            await profile.save();
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }

    },

    createAndUpdateProfile: async (req, res) => {
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

    },

    getUserByID: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avata']);
            if (!profile) return res.status(400).json({ msg: "there is no profile for this user" })
            res.json(profile)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },

    getAllProfileUser: async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avata'])
            if (!profiles) {
                return res.status(400).send({ msg: "Profile not found" })
            }
            res.json(profiles)
        } catch (error) {
            console.error(error.message)
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ msg: "Profile not found" })
            }
            res.status(500).send('Server Error')
        }
    },

    getProfileUser: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
            if (!profile) {
                return res.status(400).json({ msg: "no profile for this user" })
            }
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
    }

}