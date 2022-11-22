import { AuthErrorCodes } from '../constants/errors/auth';
import { UserErrorCodes } from '../constants/errors/user';
import { AuthError } from '../errors/auth';
import { UserError } from '../errors/user';
import { findUserByLogin } from '../repositories/user';
import { Service } from './common';

const user: Service<
    { viewerId: number, viewedLogin: string },
    { firstName?: string, lastName?: string }
> = async ({ viewerId, viewedLogin }) => {
    const viewedUser = await findUserByLogin(viewedLogin);
    if(viewedUser === null) {
        throw new UserError(UserErrorCodes.USER_DOES_NOT_EXIST);
    }
    if(viewedUser.id !== viewerId) {
        throw new AuthError(AuthErrorCodes.NOT_AUTHORIZED);
    }
    return {
        firstName: viewedUser.firstName,
        lastName: viewedUser.lastName,
    };
};

export default {
    user
};