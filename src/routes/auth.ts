import { celebrate } from 'celebrate';
import { Router } from 'express';

import authControllers from '~/controllers/auth';
import { authServicesErrorHandler } from '~/middlewares/auth';
import authRequestsValidation from '~/validation/auth';

const authRouter = Router();
authRouter.post('/register', celebrate(authRequestsValidation.registration), authControllers.registration);
authRouter.post('/login', celebrate(authRequestsValidation.login), authControllers.login);
authRouter.post('/refresh', celebrate(authRequestsValidation.refresh), authControllers.refresh);
authRouter.use(authServicesErrorHandler);
export default authRouter;
