import { errors } from 'celebrate';
import { Router } from 'express';
import { errorHandler } from '../middlewares/common';
import { authRouter } from './auth';

export const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use(errors());
apiRouter.use(errorHandler);
