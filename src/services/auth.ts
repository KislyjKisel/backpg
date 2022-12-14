import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtPayload } from 'jsonwebtoken';

import { JWT_ACCESS_KEY, JWT_ACCESS_TTL, JWT_REFRESH_KEY, JWT_REFRESH_TTL } from '~/constants/auth';
import { AuthErrorCodes } from '~/constants/errors/auth';
import AuthError from '~/errors/auth';
import { addUser, findUserById, findUserByLogin } from '~/repositories/user';
import { createToken, verifyToken } from '~/util/jwt';

import { Service } from './common';


export type RefreshTokenPayload = { data: { userId: number } } & JwtPayload;
export type AccessTokenPayload = { data: { userId: number } } & JwtPayload;

export type TokenPair = {
    accessToken: string,
    refreshToken: string
};

export type Credentials = { login: string, password: string };
export type RegistrationData = Credentials & {
    firstName: string,
    lastName: string,
    avatarId?: string,
};
export type RefreshData = { refreshToken: string };

const createUserTokens = (user: User): TokenPair => {
    const accessToken = createToken(JWT_ACCESS_KEY, <AccessTokenPayload>{
        data: { userId: user.id }
    }, {
        expiresIn: JWT_ACCESS_TTL
    });
    const refreshToken = createToken(JWT_REFRESH_KEY, <RefreshTokenPayload>{
        data: { userId: user.id }
    }, {
        expiresIn: JWT_REFRESH_TTL
    });
    return { accessToken, refreshToken };
};

const registrationService: Service<RegistrationData, TokenPair> = async (regData) => {
    const newUser = await addUser({
        login: regData.login,
        passwordHash: await argon2.hash(regData.password),
        firstName: regData.firstName,
        lastName: regData.lastName,
        avatarId: regData.avatarId,
    });
    if(newUser === null) {
        throw new AuthError(AuthErrorCodes.USER_ALREADY_EXISTS);
    }
    return createUserTokens(newUser);
};

const loginService: Service<Credentials, TokenPair> = async (credentials) => {
    const user = await findUserByLogin(credentials.login);
    if(user === null || !(await argon2.verify(user.passwordHash, credentials.password))) {
        throw new AuthError(AuthErrorCodes.BAD_CREDENTIALS);
    }
    return createUserTokens(user);
};

const refreshService: Service<RefreshData, TokenPair> = async ({ refreshToken }) => {
    const payload = <RefreshTokenPayload>verifyToken(JWT_REFRESH_KEY, refreshToken);
    const user = await findUserById(payload.data.userId);
    if(user === null) {
        throw new AuthError(AuthErrorCodes.USER_REMOVED);
    }
    return createUserTokens(user);
};

const authServices = {
    registration: registrationService,
    login: loginService,
    refresh: refreshService,
};

export default authServices;
