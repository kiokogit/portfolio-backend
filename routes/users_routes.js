import express from 'express';
import * as user_auth from '../auth/user_reg_login_logout.js'

const router = express.Router();

router.post('/login', user_auth.login);
router.post('/register', user_auth.register);
router.post('/logout', user_auth.logout);
// router.get('/profile', user.get_profile);

export default router