import bodyParser from 'body-parser';
import { celebrate } from 'celebrate';
import { Router } from 'express';

import authControllers from '~/controllers/auth';
import { authServicesErrorHandlers, registrationRequestParser } from '~/middlewares/auth';
import authRequestsValidation, { registrationAvatarValidator } from '~/validation/auth';


const authRouter = Router();
authRouter.post('/register',
    registrationRequestParser,
    celebrate(authRequestsValidation.registration), // does not expect avatarId
    registrationAvatarValidator,
    authControllers.registration,
);
authRouter.post('/login',
    bodyParser.json(),
    celebrate(authRequestsValidation.login),
    authControllers.login,
);
authRouter.post('/refresh',
    bodyParser.json(),
    celebrate(authRequestsValidation.refresh),
    authControllers.refresh,
);
authRouter.use(...authServicesErrorHandlers);
export default authRouter;
