import { celebrate } from 'celebrate';
import { Router } from 'express';
import controllers from '@controllers/user';
import { authErrorHandler } from '../middlewares/auth';
import validation from '@validation/user';
import { auth } from '@middlewares/auth';
import { userErrorHandler } from '../middlewares/user';

export const userRouter = Router();
userRouter.get('/user', ...auth({}), celebrate(validation.user), controllers.user);
userRouter.use(authErrorHandler);
userRouter.use(userErrorHandler);
