import express from 'express';
import * as user_auth from '../auth/user_reg_login_logout.js'
import { verify_token } from '../auth/verify_valid_token.js';
import { edit_profile, get_profile } from '../controllers/users_controllers.js';

const router = express.Router();

router.post('/login', user_auth.login);
router.post('/register', user_auth.register);
router.post('/logout', user_auth.logout);
router.get('/profile', verify_token, get_profile);
router.patch('/profile/edit', verify_token, edit_profile);

export default router