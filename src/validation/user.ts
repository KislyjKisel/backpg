import { Joi } from 'celebrate';
import * as consts from '../constants/user';

export const loginSchema = Joi.string()
    .alphanum()
    .min(consts.loginMinLength)
    .max(consts.loginMaxLength);

export const passwordSchema = Joi.string()
    .alphanum()
    .min(consts.passwordMinLength)
    .max(consts.passwordMaxLength);

export const firstNameSchema = Joi.string()
    .pattern(consts.FIRSTNAME_PATTERN);

export const lastNameSchema = Joi.string()
    .pattern(consts.LASTNAME_PATTERN);
