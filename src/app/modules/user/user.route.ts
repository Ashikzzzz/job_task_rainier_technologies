import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validationRequest';
import { userZodValidation } from './user.validation';

const router = express.Router();

// create user
router.post(
  '/create-user',
  validateRequest(userZodValidation.userZodSchema),
  userController.createUser,
);

export const userRouter = router;
