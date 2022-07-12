import express from 'express';
import * as admin from '../controllers/admin_controller.js';

const router = express.Router();

router.post('/login', admin.admin_login);
router.post('/register')

//get all users
router.get('/users/get');
//projects
router.get('/projects/all')


export default router