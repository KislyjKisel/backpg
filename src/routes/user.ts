import { Router } from 'express';
import controllers from '@controllers/user';
import { authMiddlewareErrorHandler } from '@middlewares/auth';
import { auth } from '@middlewares/auth';
import { userErrorHandler } from '@middlewares/user';

const userRouter = Router();
userRouter.get('/user', ...auth({}), controllers.user);
userRouter.use(userErrorHandler);
userRouter.use(authMiddlewareErrorHandler);
export default userRouter;
