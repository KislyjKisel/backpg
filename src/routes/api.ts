import { errors } from 'celebrate';
import { Router } from 'express';
import { errorHandler } from '../middlewares/common';
import { authRouter } from './auth';
import { userRouter } from './user';

export const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use(userRouter);
apiRouter.use(errors());
apiRouter.use(errorHandler);
