import { Segments } from 'celebrate';
import { loginSchema } from './common';

const user = {
    [Segments.QUERY]: {
        login: loginSchema,
    },
};

export default {
    user,
};
