import bodyParser from 'body-parser';
import { celebrate } from 'celebrate';
import { Router } from 'express';

import authControllers from '~/controllers/auth';
import { authServicesErrorHandlers, registrationRequestParser } from '~/middlewares/auth';
import authRequestSchemes, { registrationAvatarValidator } from '~/validation/auth';


const authRouter = Router();
authRouter.post('/register',
    registrationRequestParser,
    celebrate(authRequestSchemes.registration), // does not expect avatarId
    registrationAvatarValidator,
    authControllers.registration,
);
authRouter.post('/login',
    bodyParser.json(),
    celebrate(authRequestSchemes.login),
    authControllers.login,
);
authRouter.post('/refresh',
    bodyParser.json(),
    celebrate(authRequestSchemes.refresh),
    authControllers.refresh,
);
authRouter.use(...authServicesErrorHandlers);
export default authRouter;
