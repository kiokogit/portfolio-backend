import express from 'express';
import * as user_auth from '../auth/user_reg_login_logout.js'
import { get_all_user_profiles,get_one_project_details } from '../controllers/users_controllers.js';
import { get_profile_details } from '../controllers/guest_controllers.js';
import restricted_routes from './restricted_routes.js'

const router = express.Router();

//auth
router.post('/login', user_auth.login);
router.post('/register', user_auth.register);
router.post('/logout', user_auth.logout);

//requiring authentication
router.use('/auth', restricted_routes)

//accepts query q of project_id - show details of project when user selects thumbnail
router.get('/project/details', get_one_project_details) 

//GUEST RETRIEVALS
// router.get('/:profile_user_id', get_guest_data);
router.get('/profiles/all', get_all_user_profiles);
router.get('/profile/:category/:user_id', get_profile_details);

export default router