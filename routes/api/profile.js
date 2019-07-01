const express = require('express')
const router = express.Router()
const auth = require('../../midleware/auth')
const { check } = require('express-validator/check');

const ProfileController = require('../../controller/profile.controller')

router.get('/me', auth, ProfileController.getProfileUser)

router.get('/',ProfileController.getAllProfileUser )

router.get('/user/:user_id', ProfileController.getUserByID)

router.delete('/', auth, ProfileController.deleteUserAndProfile)

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'skill is required').not().isEmpty()
]], ProfileController.createAndUpdateProfile)

router.put('/experience', [auth,
    check('title', 'Title is not required')
        .not()
        .isEmpty(),
    check('company', 'Company is not required')
        .not()
        .isEmpty(),
    check('from', 'From date is not required')
        .not()
        .isEmpty(),
], ProfileController.createExperienceField)
router.put('/education', [auth,
    check('school', 'School is not required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is not required')
        .not()
        .isEmpty(),
    check('fieldOfStudy', 'FieldOfStudy is not required')
        .not()
        .isEmpty(),
    check('from', 'From date is not required')
        .not()
        .isEmpty(),
], ProfileController.createEducationField)

router.delete('/experience/:exp_id', auth, ProfileController.deleteExperienceFieldByID)

router.delete('/education/:edu_id', auth, ProfileController.deleteEducationFieldByID)

router.get('/github/:username', ProfileController.getReposGithub)

module.exports = router;
