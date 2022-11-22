import { celebrate } from 'celebrate';
import { Router } from 'express';
import controllers from '@controllers/user';
import { authMiddlewareErrorHandler } from '@middlewares/auth';
import validation from '@validation/user';
import { auth } from '@middlewares/auth';
import { userErrorHandler } from '@middlewares/user';

const userRouter = Router();
userRouter.get('/user', ...auth({}), celebrate(validation.user), controllers.user);
userRouter.use(userErrorHandler);
userRouter.use(authMiddlewareErrorHandler);
export default userRouter;
