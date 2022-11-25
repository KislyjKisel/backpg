import { Joi } from 'celebrate';

import * as consts from '@constants/user';

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

// export type ReqSchema<T> =
//     (T extends { [Segments.BODY]: infer TBody } ? {
//         [Segments.BODY]: AnySchema<TBody>
//     } : {}) &
//     (T extends { [Segments.HEADERS]: infer THeaders } ? {
//         [Segments.HEADERS]: AnySchema<THeaders>
//     } : {});

// export type ReqData<S> =
//     (S extends { [Segments.BODY]: infer TBody } ? {
//         [Segments.BODY]: TBody
//     } : {}) &
//     (S extends { [Segments.HEADERS]: infer THeaders } ? {
//         [Segments.HEADERS]: THeaders
//     } : {});

// export type ReqParser<S, T> = {
//     schema: ReqSchema<S>,
//     parse: (req: ReqData<S>) => T | null,
// };
