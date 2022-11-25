import { celebrate } from 'celebrate';
import { Router } from 'express';

import controllers from '~/controllers/post';
import { auth, authMiddlewareErrorHandler } from '~/middlewares/auth';
import { postErrorHandler } from '~/middlewares/post';
import validation from '~/validation/post';

const postRouter = Router();
postRouter.post('/create', ...auth({}), celebrate(validation.create), controllers.create);
postRouter.get('/view', celebrate(validation.view), controllers.view);
postRouter.use(postErrorHandler);
postRouter.use(authMiddlewareErrorHandler);
export default postRouter;
