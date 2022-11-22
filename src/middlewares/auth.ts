import { celebrate } from 'celebrate';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { jwtAccessKey } from '@constants/auth';
import { InternalErrorCodes } from '../constants/errors/internal';
import { AuthError } from '../errors/auth';
import { InternalError } from '../errors/common';
import { verifyToken } from '../util/jwt';
import validation, { AUTH_SCHEME_PREFIX_LENGTH } from '@validation/auth';
import { StatusCodes } from 'http-status-codes';
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { AccessTokenPayload } from '@services/auth';

export type AuthOptions = {
    /** true by default */
    required?: boolean,
};

export type AuthData = {
    id: number,
};

function authMiddleware(opts: AuthOptions): RequestHandler {
    return (req, _res, next) => {
        const optRequired = opts.required === undefined ? true : opts.required;
        const authHeader = req.headers.authorization;
        if(!authHeader && !optRequired) {
            req.auth = null;
            next();
            return;
        }
        const tokenString = authHeader?.substring(AUTH_SCHEME_PREFIX_LENGTH);
        if(!tokenString) {
            throw new InternalError(InternalErrorCodes.NOT_VALIDATED, 'authentication');
        }
        const payload = <AccessTokenPayload>verifyToken(jwtAccessKey, tokenString);
        req.auth = { id: payload.data.userId };
        next();
    };
}

export function auth(opts: AuthOptions): [RequestHandler, RequestHandler] {
    return [celebrate(validation.tokens), authMiddleware(opts)];
}

export const authErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(!(err instanceof AuthError)) {
        tokenErrorHandler(err, req, res, next); // refresh can fail on bad tokens
        return;
    }
    res.status(err.status).send(err.message);
};

export const tokenErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if(err instanceof TokenExpiredError) {
        res.status(StatusCodes.UNAUTHORIZED).send('Token expired');
        return;
    }
    if(err instanceof NotBeforeError) {
        res.status(StatusCodes.UNAUTHORIZED).send('Token used too early');
        return;
    }
    next(err);
};
