import express from 'express';
import { change_password } from '../auth/change_reset_user_password.js';
import * as user_auth from '../auth/user_reg_login_logout.js'
import { verify_token } from '../auth/verify_valid_token.js';
import { add_project, del_project, edit_profile, edit_project, get_profile, get_profile_details, get_user_projects } from '../controllers/users_controllers.js';

const router = express.Router();

//auth
router.post('/login', user_auth.login);
router.post('/register', user_auth.register);
router.post('/logout', user_auth.logout);
router.post('/user/change_password', verify_token, change_password);

//profile details - cv
router.get('/profile/lean/:profile_user_id', get_profile);          //lean profile - shallow basic profile details accessible by all
router.get('/profile/:category/:user_id', get_profile_details);
router.patch('/profile/edit', verify_token, edit_profile);

//projects - resume
//by the projects owner
router.post('/profile/projects/add', verify_token, add_project);
router.delete('/profile/projects/del/:project_id', verify_token, del_project);
router.patch('/profile/projects/edit/:project_id',verify_token, edit_project);
router.patch('/profile/projects/edit/:project_id/:project_owner_id')
//no login required
router.get('/profile/projects/get/:user_id', get_user_projects);


export default router