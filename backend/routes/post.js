import express from 'express'

const router = express.Router()

import Post from '../models/Post.js'

import { authMiddleware } from '../utils/auth.js'

router.use(authMiddleware)

router.post('/', async (req, res) => {
    try {
        // NOTE: our post needs to know what user it's related to...
        const post = await Post.create({
            ...req.body,
            author: req.user._id
        })
        res.status(200).json(post)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

export default router