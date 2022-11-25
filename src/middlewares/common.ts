import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { InternalError } from '@errors/common';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
