import { celebrate } from 'celebrate';
import { Router } from 'express';
import controllers from '../controllers/auth';
import { authErrorHandler } from '../middlewares/auth';
import validation from '../validation/auth';

export const authRouter = Router();
authRouter.post('/register', celebrate(validation.registration), controllers.registration);
authRouter.post('/login', celebrate(validation.login), controllers.login);
authRouter.post('/refresh', celebrate(validation.refresh), controllers.refresh);
authRouter.use(authErrorHandler);
