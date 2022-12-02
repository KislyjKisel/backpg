import { StatusCodes } from 'http-status-codes';

import { UserErrorCodes, UserErrorMessages, UserErrorNames, UserErrorStatuses } from '~/constants/errors/user';


export class UserError extends Error {
    status: StatusCodes;

    constructor(code: UserErrorCodes) {
        super(UserErrorMessages[code]);
        this.name = UserErrorNames[code];
        this.status = UserErrorStatuses[code];
    }
}
