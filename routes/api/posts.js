const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../../midleware/auth')

const { createAPost,
    getAllPosts,
    getPostByID,
    deleteAPost,
    likeAPost,
    unlikeAPost,
    commentOnAPost, 
    deleteCommentByID } = require('../../controller/post.controller')

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], createAPost)

router.get('/', auth, getAllPosts)

router.get('/:id', auth, getPostByID)

router.delete('/:id', auth, deleteAPost)

router.put('/like/:id', auth, likeAPost)

router.put('/unlike/:id', auth, unlikeAPost)

router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], commentOnAPost)

router.delete('/comment/:id/:comment_id', auth, deleteCommentByID)
module.exports = router;
