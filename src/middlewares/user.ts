import UserError from '~/errors/user';

import { makeErrorHandler } from './common';


export const userErrorHandler = makeErrorHandler(UserError);
