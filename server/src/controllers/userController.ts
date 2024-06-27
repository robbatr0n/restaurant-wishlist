import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '@src/models/userModel';

/**
 * Route to authenticate a user
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
 * Route to Route to register a new user
 * @param req {Request}
 * @param res {Response}
 *
 * @Remark
 * Method: POST
 * Route: /api/users
 * Access: Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * Route to logout user
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
 * Route to get user profile
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
 * Route to update user profile
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
