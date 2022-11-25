import { GetController } from './common';
import services from '@services/user';
import { InternalError } from '@errors/common';
import { InternalErrorCodes } from '@constants/errors/internal';
import { StatusCodes } from 'http-status-codes';

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
