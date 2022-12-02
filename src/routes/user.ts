import { Router } from 'express';

import userControllers from '~/controllers/user';
import { auth, authMiddlewareErrorHandler } from '~/middlewares/auth';
import { userErrorHandler } from '~/middlewares/user';


const userRouter = Router();
userRouter.get('/user', ...auth({}), userControllers.user);
userRouter.use(userErrorHandler);
userRouter.use(authMiddlewareErrorHandler);
export default userRouter;
