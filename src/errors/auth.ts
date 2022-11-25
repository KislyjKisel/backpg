import { StatusCodes } from 'http-status-codes';

import { AuthErrorCodes, AuthErrorMessages, AuthErrorNames, AuthErrorStatuses } from '../constants/errors/auth';

export class AuthError extends Error {
    status: StatusCodes;

    constructor(code: AuthErrorCodes) {
        super(AuthErrorMessages[code]);
        this.name = AuthErrorNames[code];
        this.status = AuthErrorStatuses[code];
    }
}
