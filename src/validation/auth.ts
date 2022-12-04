import path from 'path';
import { promisify } from 'util';

import { Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';
import imageSize from 'image-size';

import { AuthErrorCodes } from '~/constants/errors/auth';
import { IMAGES_DIR } from '~/constants/paths';
import { AVATAR_SIZE, AVATAR_TYPE } from '~/constants/user';
import AuthError from '~/errors/auth';
import { AuthOptions } from '~/util/auth';
import { tokenRegexString } from '~/util/jwt';

import { loginSchema, passwordSchema, firstNameSchema, lastNameSchema } from './common';


export const TTL_PATTERN = /^\d+[smh]$/;

const refreshRequestSchema = {
    [Segments.BODY]: Joi.object({
        refreshToken: Joi.string()
    }),
};

const loginRequestSchema = {
    [Segments.BODY]: Joi.object({
        login: loginSchema.required(),
        password: passwordSchema.required(),
    }),
};

const registrationRequestSchema = {
    [Segments.BODY]: Joi.object({
        login: loginSchema.required(),
        password: passwordSchema.required(),
        firstName: firstNameSchema,
        lastName: lastNameSchema,
        avatar: Joi.binary(),
    })
};

const authRequestsValidation = {
    registration: registrationRequestSchema,
    login: loginRequestSchema,
    refresh: refreshRequestSchema
};

export default authRequestsValidation;


const AUTH_SCHEME_PREFIX = 'Bearer ';
export const AUTH_SCHEME_PREFIX_LENGTH = AUTH_SCHEME_PREFIX.length;
const AUTH_HEADER_REGEX = new RegExp(AUTH_SCHEME_PREFIX + tokenRegexString); 

const authHeaderValueSchema = Joi.string().pattern(AUTH_HEADER_REGEX);

export const authHeaderSchema = (opts: AuthOptions) => {
    const headerSchema = Joi.object({
        authorization: opts.required ? authHeaderValueSchema.required() : authHeaderValueSchema,
    }).unknown(true);
    return {
        [Segments.HEADERS]: headerSchema
    };
};

export const registrationAvatarValidator: RequestHandler = async (req, _res, next) => {
    try {
        if(req.file) {
            const avatarInfo = await promisify(imageSize)(path.join(IMAGES_DIR, req.file.filename));
            if(avatarInfo?.type !== AVATAR_TYPE ||
                avatarInfo?.height !== AVATAR_SIZE ||
                avatarInfo?.width !== AVATAR_SIZE
            ) {
                next(new AuthError(AuthErrorCodes.BAD_AVATAR));
            }
            req.body.avatarId = req.file.filename.substring(0, req.file.filename.length - AVATAR_TYPE.length - 1);
        }
        next();
    }
    catch(e) {
        next(e);
    }
};
