import express from 'express'

const router = express.Router()

router.get('/', (req,res) => {
    return res.json('this is users')
})

export default router