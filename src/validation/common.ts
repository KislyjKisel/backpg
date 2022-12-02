import { Joi } from 'celebrate';

import * as consts from '~/constants/user';


export const loginSchema = Joi.string()
    .alphanum()
    .min(consts.LOGIN_MIN_LENGTH)
    .max(consts.LOGIN_MAX_LENGTH);

export const passwordSchema = Joi.string()
    .alphanum()
    .min(consts.PASSWORD_MIN_LENGTH)
    .max(consts.PASSWORD_MAX_LENGTH);

export const firstNameSchema = Joi.string()
    .pattern(consts.FIRSTNAME_PATTERN);

export const lastNameSchema = Joi.string()
    .pattern(consts.LASTNAME_PATTERN);
