import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

/**
 * Authenticate a user
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: POST
 * Route: /api/users/auth
 * Access: Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Auth user' });
});

/**
 * REgister a new user
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: POST
 * Route: /api/users
 * Access: Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Register user' });
});

/**
 * Logout user
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: POST
 * Route: /api/users/logout
 * Access: Public
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout user' });
});

/**
 * Get user profile
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: Get
 * Route: /api/users/profile
 * Access: Private
 */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get user profile' });
});

/**
 * Update user profile
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: Put
 * Route: /api/users/profile
 * Access: Private
 */
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Update user profile' });
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
