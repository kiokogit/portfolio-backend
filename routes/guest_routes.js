import express from 'express';
import { verify_guest_token } from '../auth/verify_valid_token.js';
import { get_guest_data } from '../controllers/guest_controllers.js';
import { get_current_profile } from '../controllers/users_controllers.js';

const router = express.Router();

router.get('/profile/get/:token_key', verify_guest_token, get_current_profile);
router.get('/search', get_guest_data)

export default router;