import { StatusCodes } from 'http-status-codes';

import { ErrorMessages, ErrorNames, ErrorStatuses } from './common';


export enum AuthErrorCodes {
    USER_ALREADY_EXISTS = 1,
    BAD_CREDENTIALS = 2,
    USER_REMOVED = 3,
    NOT_AUTHORIZED = 4,
    NOT_AUTHENTICATED = 5,
}

export const AuthErrorNames: ErrorNames<AuthErrorCodes> = {
    [AuthErrorCodes.USER_ALREADY_EXISTS]: 'USER_ALREADY_EXISTS',
    [AuthErrorCodes.BAD_CREDENTIALS]: 'BAD_CREDENTIALS',
    [AuthErrorCodes.USER_REMOVED]: 'USER_REMOVED',
    [AuthErrorCodes.NOT_AUTHORIZED]: 'NOT_AUTHORIZED',
    [AuthErrorCodes.NOT_AUTHENTICATED]: 'NOT_AUTHENTICATED',
};

export const AuthErrorMessages: ErrorMessages<AuthErrorCodes> = {
    [AuthErrorCodes.USER_ALREADY_EXISTS]: 'User already registered',
    [AuthErrorCodes.BAD_CREDENTIALS]: 'Bad credentials',
    [AuthErrorCodes.USER_REMOVED]: 'User was removed',
    [AuthErrorCodes.NOT_AUTHORIZED]: 'Not authorized',
    [AuthErrorCodes.NOT_AUTHENTICATED]: 'Not authenticated',
};

export const AuthErrorStatuses: ErrorStatuses<AuthErrorCodes> = {
    [AuthErrorCodes.USER_ALREADY_EXISTS]: StatusCodes.CONFLICT,
    [AuthErrorCodes.BAD_CREDENTIALS]: StatusCodes.CONFLICT,
    [AuthErrorCodes.USER_REMOVED]: StatusCodes.CONFLICT,
    [AuthErrorCodes.NOT_AUTHORIZED]: StatusCodes.UNAUTHORIZED,
    [AuthErrorCodes.NOT_AUTHENTICATED]: StatusCodes.UNAUTHORIZED,
};
