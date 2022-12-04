import { celebrate } from 'celebrate';
import { Router } from 'express';

import userControllers from '~/controllers/user';
import { auth, authMiddlewareErrorHandler } from '~/middlewares/auth';
import { userErrorHandler } from '~/middlewares/user';
import userRequestsValidation from '~/validation/user';


const userRouter = Router();
userRouter.get('/user/:login?',
    ...auth({ required: false }),
    celebrate(userRequestsValidation.user),
    userControllers.user
);
userRouter.use(userErrorHandler);
userRouter.use(authMiddlewareErrorHandler);
export default userRouter;
