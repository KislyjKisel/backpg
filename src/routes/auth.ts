import { celebrate } from 'celebrate';
import { Router } from 'express';
import controllers from '../controllers/auth';
import { authErrorHandler } from '../middlewares/auth';
import reqSchema from '../validation/auth';

export const authRouter = Router();
authRouter.post('/register', celebrate(reqSchema.registration), controllers.registration);
authRouter.post('/login', celebrate(reqSchema.login), controllers.login);
authRouter.post('/refresh', celebrate(reqSchema.refresh), controllers.refresh);
authRouter.use(authErrorHandler);
