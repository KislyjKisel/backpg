import { StatusCodes } from 'http-status-codes';

import { GetController } from './common';

import { InternalErrorCodes } from '@constants/errors/internal';
import { InternalError } from '@errors/common';
import services from '@services/user';

const user: GetController = async (req, res, next) => {
    try {
        if(!req.auth) {
            throw new InternalError(InternalErrorCodes.NOT_AUTHENTICATED);
        }
        const profile = await services.user({
            id: req.auth.id,
        });
        res.status(StatusCodes.OK).send(profile);
    }
    catch(e) {
        next(e);
    }
};

export default {
    user,
};
