import { format } from 'util';
import { InternalErrorCodes, InternalErrorReasons } from '../constants/errors/internal';

export class InternalError extends Error {
    reason: string;

    constructor(code: InternalErrorCodes, ...args: unknown[]){
        super();
        this.name = 'Internal';
        this.reason = format(InternalErrorReasons[code], ...args);
    }
}
