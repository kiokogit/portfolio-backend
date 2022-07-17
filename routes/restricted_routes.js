import express from 'express'
import { verify_token } from '../auth/verify_valid_token.js';
import { add_project, del_project, edit_profile, edit_project, get_current_profile, get_user_projects, like_comment_projects, projects_in_brief } from '../controllers/users_controllers.js';
import { change_password } from '../auth/change_reset_user_password.js';


const router = express.Router();
//AUTH MIDDLEWARE
router.use(verify_token)

router.get('/profile/get_current/', get_current_profile);          //lean profile - shallow basic profile details accessible by all
router.post('/change_password', change_password);

//profile details - cv
router.patch('/profile/edit', edit_profile);

//projects - resume
//by the projects owner
router.post('/projects/add', add_project);
router.delete('/projects/del/:project_id', del_project);
router.patch('/projects/edit/:project_id', edit_project);
//like and comments can be done by anyone
router.patch('/profile/projects/:action_type/:project_id', like_comment_projects);

//USER LOGGEDIN
//get all user projects
router.get('/projects', get_user_projects);
//title and cover photo/icon of project; only 3; accepts extension of limit on selecting more;
router.get('/projects/brief', projects_in_brief); 

export default router