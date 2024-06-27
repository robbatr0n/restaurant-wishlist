import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Authenticate user
 * @route   /api/users/auth
 * @method  POST
 * @access  Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'auth user' });
});

export { authUser };
