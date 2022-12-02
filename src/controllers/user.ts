import { StatusCodes } from 'http-status-codes';


import { InternalErrorCodes } from '~/constants/errors/internal';
import { InternalError } from '~/errors/common';
import userServices from '~/services/user';

import { GetController } from './common';

const userController: GetController = async (req, res, next) => {
    try {
        if(!req.auth) {
            throw new InternalError(InternalErrorCodes.NOT_AUTHENTICATED);
        }
        const profile = await userServices.user({
            id: req.auth.id,
        });
        res.status(StatusCodes.OK).send(profile);
    }
    catch(e) {
        next(e);
    }
};

const userControllers = {
    user: userController,
};

export default userControllers;
