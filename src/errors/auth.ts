import { AuthErrorMessages, AuthErrorNames, AuthErrorStatuses } from '~/constants/errors/auth';

import { makeErrorClass } from './common';


const AuthError = makeErrorClass(
    AuthErrorNames,
    AuthErrorMessages,
    AuthErrorStatuses
);

export default AuthError;
