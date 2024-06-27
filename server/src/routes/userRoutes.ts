import express, { Router } from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '@src/controllers/userController';

const router: Router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
