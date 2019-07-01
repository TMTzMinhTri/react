const { check, validationResult } = require('express-validator/check')

const Post = require('../models/Post.modal')
const Profile = require('../models/Profile.modal')
const User = require('../models/User')

module.exports = {
    createAPost: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                user: req.user.id,
                avata: user.avata
            })

            const post = await newPost.save()
            res.json(post)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }

    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 })
            res.json(posts)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }
    },
    getPostByID: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                res.status(404).json({ msg: "Post not found" })
            }
            res.json(post)
        } catch (error) {
            console.log(error.message)
            if (error.kind === 'ObkectId') {
                res.status(404).json({ msg: "Post not found" })

            }
            res.status(500).send('server error')
        }
    },
    deleteAPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                res.status(404).json({ msg: "Post not found" })
            }

            if (post.user.toString() !== req.user.id) {
                res.status(401).json({ msg: "User not authoried" })
            }

            await post.remove()

            res.json({ msg: "Post removed" })
        } catch (error) {
            console.log(error.message)
            if (error.kind === 'ObkectId') {
                res.status(404).json({ msg: "Post not found" })

            }
            res.status(500).send('server error')
        }
    },
    likeAPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ msg: "Post already liked" });
            }
            post.likes.unshift({ user: req.user.id })
            await post.save()
            res.json(post.likes)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }
    },
    unlikeAPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ msg: "Post has not yet been liked" });
            }
            //get remove index
            const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id))
            post.likes.splice(removeIndex, 1)
            await post.save()
            res.json(post.likes)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }
    },
    commentOnAPost: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {

            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id,
                avata: user.avata
            }
            post.comments.unshift(newComment)

            await post.save()
            res.json(post.comments)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }

    },
    deleteCommentByID: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            //pull out comment
            const comment = post.comments.find(item => item.id === req.params.comment_id)
            //make sure comment exist
            if (!comment) {
                return res.status(404).json({ msg: "comment does not exist" })
            }
            //check user
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "User not authoried" })
            }

            //get remove index
            const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id))
            post.comments.splice(removeIndex, 1)
            await post.save()

            res.json(post.comments)


        } catch (error) {
            console.log(error.message)
            res.status(500).send('server error')
        }
    },

}