import { Joi, Segments } from 'celebrate';

import { POST_TEXT_MAX_LENGTH, POST_TITLE_MAX_LENGTH } from '~/constants/post';


const createPostRequestSchema = {
    [Segments.BODY]: {
        text: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${POST_TEXT_MAX_LENGTH}}`)).required(),
        title: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${POST_TITLE_MAX_LENGTH}}`)).required(),
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
