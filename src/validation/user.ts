import { Segments, Joi } from 'celebrate';

import { loginSchema } from './common';


const userRequestSchema = {
    [Segments.PARAMS]: Joi.object({
        login: loginSchema.optional(),
    }),
};

const userRequestsValidation = {
    user: userRequestSchema,
};

export default userRequestsValidation;
