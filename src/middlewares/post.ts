import { ErrorRequestHandler } from 'express';
import { PostError } from '@errors/post';

export const postErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(!(err instanceof PostError)) {
        next(err);
        return;
    }
    res.status(err.status).send(err.message);
};
