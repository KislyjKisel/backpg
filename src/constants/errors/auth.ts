import { StatusCodes } from 'http-status-codes';
import { ErrorMessages, ErrorNames, ErrorStatuses } from './common';

export enum AuthErrorCodes {
    USER_EXISTS = 1,
    BAD_CREDENTIALS = 2,
    USER_REMOVED = 3,
}

export const AuthErrorNames: ErrorNames<AuthErrorCodes> = {
    [AuthErrorCodes.USER_EXISTS]: 'USER_EXISTS',
    [AuthErrorCodes.BAD_CREDENTIALS]: 'BAD_CREDENTIALS',
    [AuthErrorCodes.USER_REMOVED]: 'USER_REMOVED',
};

export const AuthErrorMessages: ErrorMessages<AuthErrorCodes> = {
    [AuthErrorCodes.USER_EXISTS]: 'User already registered',
    [AuthErrorCodes.BAD_CREDENTIALS]: 'Bad credentials',
    [AuthErrorCodes.USER_REMOVED]: 'User was removed',
};

export const AuthErrorStatuses: ErrorStatuses<AuthErrorCodes> = {
    [AuthErrorCodes.USER_EXISTS]: StatusCodes.CONFLICT,
    [AuthErrorCodes.BAD_CREDENTIALS]: StatusCodes.CONFLICT,
    [AuthErrorCodes.USER_REMOVED]: StatusCodes.CONFLICT,
};
