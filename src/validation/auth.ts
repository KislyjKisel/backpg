import { Segments, Joi } from 'celebrate';
import { tokenRegexString } from '../util/jwt';
import { loginSchema, passwordSchema, firstNameSchema, lastNameSchema } from './common';

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

// todo: what headers should be allowed?
const tokens = {
    [Segments.HEADERS]: {
        authorization: Joi.string().pattern(AUTH_HEADER_REGEX).required(),
        ['content-type']: Joi.any(),
        ['content-length']: Joi.any(),
    },
};

export const authSchema = Joi.object({
    id: Joi.number().allow(null),
});

export default {
    registration, login, refresh, tokens
};
