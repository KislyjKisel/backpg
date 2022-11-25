import { ErrorRequestHandler } from 'express';

import { UserError } from '~/errors/user';

export const userErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(!(err instanceof UserError)) {
        next(err);
        return;
    }
    res.status(err.status).send(err.message);
};
