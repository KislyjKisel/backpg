import { celebrate, CelebrateError } from 'celebrate';
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
import { AuthErrorCodes } from '../constants/errors/auth';

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
        celebrate(validation.tokens),
        authValidationErrorHandler,
        authMiddleware(opts)
    ];
}

export const authServicesErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(!(err instanceof AuthError)) {
        authMiddlewareErrorHandler(err, req, res, next); // refresh can fail on bad tokens
        return;
    }
    res.status(err.status).send(err.message);
};

export const authMiddlewareErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
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
