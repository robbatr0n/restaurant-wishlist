import express, { Router } from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '@src/controllers/userController';

const router: Router = express.Router();

router.post('/auth', authUser);

export default router;
