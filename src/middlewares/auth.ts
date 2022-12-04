import path from 'path';

import { celebrate, CelebrateError } from 'celebrate';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { JWT_ACCESS_KEY } from '~/constants/auth';
import { InternalErrorCodes } from '~/constants/errors/internal';
import { IMAGES_DIR } from '~/constants/paths';
import { AVATAR_TYPE } from '~/constants/user';
import AuthError from '~/errors/auth';
import { InternalError } from '~/errors/common';
import { AccessTokenPayload } from '~/services/auth';
import { AuthOptions } from '~/util/auth';
import { verifyToken } from '~/util/jwt';
import { authHeaderSchema, AUTH_SCHEME_PREFIX_LENGTH } from '~/validation/auth';

import { makeErrorHandler } from './common';


export type AuthData = {
    id: number,
};

// todo: don't load files for invalid requests
const multerStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(process.cwd(), IMAGES_DIR));
    },
    filename: (_req, _file, cb) => {
        cb(null, uuidv4() + '.' + AVATAR_TYPE);
    },
});

export const registrationRequestParser = multer({
    storage: multerStorage,
    dest: IMAGES_DIR + '/',
}).single('avatar');

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

export function auth(opts: AuthOptions = {}): [RequestHandler, ErrorRequestHandler, RequestHandler] {
    const authValidationErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
        if(!(err instanceof CelebrateError)) {
            next(err);
            return;
        }
        res.status(StatusCodes.UNAUTHORIZED).send(err.message);
    };

    return [
        celebrate(authHeaderSchema(opts)),
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
