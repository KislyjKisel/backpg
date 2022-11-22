import { Controller } from './common';
import services from '@services/user';
import { AuthData } from '../middlewares/auth';
import { InternalError } from '../errors/common';
import { InternalErrorCodes } from '../constants/errors/internal';
import { StatusCodes } from 'http-status-codes';

const user: Controller<{ viewedLogin: string, auth: AuthData }> = async (req, res, next) => {
    try {
        if(!req.auth) {
            throw new InternalError(InternalErrorCodes.NOT_AUTHENTICATED);
        }
        const viewedLogin = req.query.login?.toString();
        const profile = await services.user({
            viewerId: req.auth.id,
            viewedLogin: viewedLogin || '',
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
