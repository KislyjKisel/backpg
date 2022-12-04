import { StatusCodes } from 'http-status-codes';

import userServices from '~/services/user';

import { GetController } from './common';


const userController: GetController = async (req, res, next) => {
    try {
        const profile = await userServices.user({
            login: req.params['login'],
            viewerId: req.auth?.id,
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
