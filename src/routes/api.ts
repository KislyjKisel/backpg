import { errors } from 'celebrate';
import { Router } from 'express';

import { errorHandler } from '~/middlewares/common';

import authRouter from './auth';
import postRouter from './post';
import userRouter from './user';


const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use(userRouter);
apiRouter.use('/post', postRouter);
apiRouter.use(errors());
apiRouter.use(errorHandler);
export default apiRouter;
