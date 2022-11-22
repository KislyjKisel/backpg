import { Segments, Joi } from 'celebrate';
import { tokenRegexString } from '../util/jwt';
import { loginSchema, passwordSchema, firstNameSchema, lastNameSchema } from './user';

export const TTL_PATTERN = /^\d+[smh]$/;

const refresh = {
    [Segments.BODY]: Joi.object({
        refreshToken: Joi.string()
    }),
};

const login = {
    [Segments.BODY]: Joi.object({
        login: loginSchema.required(),
        password: passwordSchema.required(),
    }),
};

const registration = {
    [Segments.BODY]: Joi.object({
        login: loginSchema.required(),
        password: passwordSchema.required(),
        firstName: firstNameSchema,
        lastName: lastNameSchema,
    })
};

const AUTH_SCHEME_PREFIX = 'Bearer ';
export const AUTH_SCHEME_PREFIX_LENGTH = AUTH_SCHEME_PREFIX.length;
const AUTH_HEADER_REGEX = new RegExp(AUTH_SCHEME_PREFIX + tokenRegexString); 

const tokens = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().pattern(AUTH_HEADER_REGEX).required()
    }),
};

export default {
    registration, login, refresh, tokens
};
