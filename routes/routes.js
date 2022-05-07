import express from 'express';
import admin_routes from './admin_routes.js';
import users_routes from './users_routes.js';
import guest_routes from './guest_routes.js';

const router = express.Router();

router.use('/admin', admin_routes);
router.use('/user', users_routes);
router.use('/guest', guest_routes);

export default router;