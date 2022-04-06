import express from 'express';
import * as user from '../controllers/users_controllers'

const router = express.Router();

router.post('/login', user.login)
    .post('/register', user.register)
    .get('/profile', user.get_profile)

export default router