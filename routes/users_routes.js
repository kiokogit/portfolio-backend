import express from 'express';
import { change_password } from '../auth/change_reset_user_password.js';
import * as user_auth from '../auth/user_reg_login_logout.js'
import { verify_token } from '../auth/verify_valid_token.js';
import { add_project, del_project, edit_profile, edit_project, get_all_user_profiles,get_current_profile, get_user_projects, like_comment_projects } from '../controllers/users_controllers.js';
import { get_guest_data,  get_profile_details } from '../controllers/guest_controllers.js';


const router = express.Router();

//auth
router.post('/login', user_auth.login);
router.post('/register', user_auth.register);
router.post('/logout', user_auth.logout);
router.post('/user/change_password', verify_token, change_password);

//profile details - cv
router.get('/profile/get_current/',verify_token, get_current_profile);          //lean profile - shallow basic profile details accessible by all
router.patch('/profile/edit', verify_token, edit_profile);

//projects - resume
//by the projects owner
router.post('/projects/add', verify_token, add_project);
router.delete('/profile/projects/del/:project_id', verify_token, del_project);
router.patch('/profile/projects/edit/:project_id',verify_token, edit_project);
router.patch('/profile/projects/:action_type/:project_id', verify_token, like_comment_projects);
//USER LOGGEDIN
router.get('/projects',verify_token, get_user_projects);

//GUEST RETRIEVALS
// router.get('/:profile_user_id', get_guest_data);
router.get('/profiles/all', get_all_user_profiles);
router.get('/profile/:category/:user_id', get_profile_details);

export default router