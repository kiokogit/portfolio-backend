import express from 'express';
import * as admin from '../controllers/admin_controller';

const router = express.Router();

router.post('/login', admin.admin_login);

export default router