import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '@src/models/userModel';
import generateToken from '@src/utils/generateToken';

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
  const { email, password }: IUser = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
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
    generateToken(res, user._id);

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
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out user' });
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
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
