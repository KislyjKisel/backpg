import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CodedError, InternalError } from '~/errors/common';


export const makeErrorHandler = <T extends CodedError, C>(clas: new(code: C, ...args: unknown[]) => T): ErrorRequestHandler =>
    (err, _req, res, next) => {
        if(!(err instanceof clas)) {
            next(err);
            return;
        }
        res.status(err.status).send(err.message);
    };

export const fallbackErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(res.headersSent) {
        next(err);
        return;
    }
    if(err instanceof InternalError) {
        console.error('Internal error "%s" on request %j', err.reason, req);
    }
    else {
        console.error('Unknown internal error on request %j: ', req, err);
    }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};
