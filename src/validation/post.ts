import { Joi, Segments } from 'celebrate';

import { postTextMaxLength, postTitleMaxLength } from '~/constants/post';


const createPostRequestSchema = {
    [Segments.BODY]: {
        text: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${postTextMaxLength}}`)).required(),
        title: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${postTitleMaxLength}}`)).required(),
    },
};

const viewPostRequestSchema = {
    [Segments.QUERY]: {
        id: Joi.number().required(),
    },
};

const postRequestsValidation = {
    create: createPostRequestSchema,
    view: viewPostRequestSchema,
};

export default postRequestsValidation;
