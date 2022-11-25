import { celebrate } from 'celebrate';
import { Router } from 'express';

import controllers from '../controllers/auth';
import { authServicesErrorHandler } from '../middlewares/auth';
import validation from '../validation/auth';

const authRouter = Router();
authRouter.post('/register', celebrate(validation.registration), controllers.registration);
authRouter.post('/login', celebrate(validation.login), controllers.login);
authRouter.post('/refresh', celebrate(validation.refresh), controllers.refresh);
authRouter.use(authServicesErrorHandler);
export default authRouter;
