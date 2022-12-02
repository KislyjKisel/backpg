import { celebrate, CelebrateError } from 'celebrate';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

import { JWT_ACCESS_KEY } from '~/constants/auth';
import { InternalErrorCodes } from '~/constants/errors/internal';
import AuthError from '~/errors/auth';
import { InternalError } from '~/errors/common';
import { AccessTokenPayload } from '~/services/auth';
import { verifyToken } from '~/util/jwt';
import { authHeaderSchema, AUTH_SCHEME_PREFIX_LENGTH } from '~/validation/auth';

import { makeErrorHandler } from './common';


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
        const payload = <AccessTokenPayload>verifyToken(JWT_ACCESS_KEY, tokenString);
        req.auth = { id: payload.data.userId };
        next();
    };
}

export function auth(opts?: AuthOptions): [RequestHandler, ErrorRequestHandler, RequestHandler] {
    opts = opts || {};

    const authValidationErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
        if(!(err instanceof CelebrateError)) {
            next(err);
            return;
        }
        res.status(StatusCodes.UNAUTHORIZED).send(err.message);
    };

    return [
        celebrate(authHeaderSchema),
        authValidationErrorHandler,
        authMiddleware(opts)
    ];
}

export const authMiddlewareErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if(err instanceof TokenExpiredError) {
        res.status(StatusCodes.UNAUTHORIZED).send('Token expired');
        return;
    }
    if(err instanceof NotBeforeError) {
        res.status(StatusCodes.UNAUTHORIZED).send('Token used too early');
        return;
    }
    if(err instanceof JsonWebTokenError) {
        res.status(StatusCodes.UNAUTHORIZED).send('Invalid token');
        return;
    }
    next(err);
};

export const authServicesErrorHandlers = [
    makeErrorHandler(AuthError),
    authMiddlewareErrorHandler, // refresh can fail on bad tokens
];
