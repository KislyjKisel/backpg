import { Joi, Segments } from 'celebrate';

import { postTextMaxLength, postTitleMaxLength } from '~/constants/post';

const createPostValidation = {
    [Segments.BODY]: {
        text: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${postTextMaxLength}}`)).required(),
        title: Joi.string().pattern(new RegExp(`^[A-Za-z ]{1,${postTitleMaxLength}}`)).required(),
    },
};

const viewPostValidation = {
    [Segments.QUERY]: {
        id: Joi.number().required(),
    },
};

export default {
    create: createPostValidation,
    view: viewPostValidation,
};
