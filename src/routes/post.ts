import { celebrate } from 'celebrate';
import { Router } from 'express';

import postControllers from '~/controllers/post';
import { auth, authMiddlewareErrorHandler } from '~/middlewares/auth';
import { postErrorHandler } from '~/middlewares/post';
import postRequestsValidation from '~/validation/post';

const postRouter = Router();
postRouter.post('/create', ...auth({}), celebrate(postRequestsValidation.create), postControllers.create);
postRouter.get('/view', celebrate(postRequestsValidation.view), postControllers.view);
postRouter.use(postErrorHandler);
postRouter.use(authMiddlewareErrorHandler);
export default postRouter;
