import { Segments, Joi } from 'celebrate';

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

export const authHeaderSchema = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().pattern(AUTH_HEADER_REGEX).required(),
    }).unknown(true),
};
