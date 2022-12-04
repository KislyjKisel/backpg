import { AuthErrorCodes } from '~/constants/errors/auth';
import { UserErrorCodes } from '~/constants/errors/user';
import AuthError from '~/errors/auth';
import UserError from '~/errors/user';
import { findUserById, findUserByLogin } from '~/repositories/user';

import { Service } from './common';


const userService: Service<
    { login?: string, viewerId?: number },
    { login: string, firstName?: string, lastName?: string, avatarId: string | null }
> = async ({ login, viewerId }) => {
    let user;
    if(!login) {
        if(!viewerId) {
            throw new AuthError(AuthErrorCodes.NOT_AUTHENTICATED);
        }
        user = await findUserById(viewerId);
    }
    else {
        user = await findUserByLogin(login);
        if(!viewerId) {
            viewerId = user?.id;
        }
    }
    if(user === null) {
        throw new UserError(UserErrorCodes.USER_DOES_NOT_EXIST);
    }
    // if(viewerId != user?.id) {
    // todo: return partial user info
    // }
    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarId: user.avatarId,
    };
};

const userServices = {
    user: userService,
};

export default userServices;
