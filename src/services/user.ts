import { AuthErrorCodes } from '../constants/errors/auth';
import { UserErrorCodes } from '../constants/errors/user';
import { UserError } from '../errors/user';
import { findUserById } from '../repositories/user';
import { Service } from './common';

const user: Service<
    { id: number },
    { login: string, firstName?: string, lastName?: string }
> = async ({ id }) => {
    const user = await findUserById(id);
    if(user === null) {
        throw new UserError(UserErrorCodes.USER_DOES_NOT_EXIST);
    }
    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};

export default {
    user
};