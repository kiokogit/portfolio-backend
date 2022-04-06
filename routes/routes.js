import express from 'express';
import admin_routes from './admin_routes.js';
import users_routes from './users_routes.js';

const router = express.Router();

router.use('/admin', admin_routes);
router.use('/user', users_routes);

export default router;