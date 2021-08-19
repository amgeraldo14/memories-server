import express from 'express'
import postsRouter from './posts.js'

const router = express.Router()

router.use('/', postsRouter)

export default router