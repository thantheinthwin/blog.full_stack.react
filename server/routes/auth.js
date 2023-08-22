import { register, login, logout, validateUser } from '../controllers/auth.js';
import express from 'express'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/validateUser', validateUser)

export default router