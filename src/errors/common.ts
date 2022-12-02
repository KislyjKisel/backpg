import { format } from 'util';

import { StatusCodes } from 'http-status-codes';

import { ErrorMessages, ErrorNames, ErrorStatuses } from '~/constants/errors/common';
import { InternalErrorCodes, InternalErrorReasons } from '~/constants/errors/internal';


export class InternalError extends Error {
    reason: string;

    constructor(code: InternalErrorCodes, ...args: unknown[]){
        super();
        this.name = 'Internal';
        this.reason = format(InternalErrorReasons[code], ...args);
    }
}

export class CodedError extends Error {
    status: StatusCodes;

    constructor(status: StatusCodes, message?: string) {
        super(message);
        this.status = status;
    }
}

export const makeErrorClass = <T extends number>(
    names: ErrorNames<T>,
    messages: ErrorMessages<T>,
    statuses: ErrorStatuses<T>
): typeof Err => {
    const Err = class extends CodedError {
        constructor(code: T, ...args: unknown[]) {
            super(statuses[code], format(messages[code], ...args));
            this.name = names[code]; // unused
        }
    };
    return Err;
};
