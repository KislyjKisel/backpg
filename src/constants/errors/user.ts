import { StatusCodes } from 'http-status-codes';
import { ErrorMessages, ErrorNames, ErrorStatuses } from './common';

export enum UserErrorCodes {
    USER_DOES_NOT_EXIST = 1,
}

export const UserErrorNames: ErrorNames<UserErrorCodes> = {
    [UserErrorCodes.USER_DOES_NOT_EXIST]: 'USER_DOES_NOT_EXIST',
};

export const UserErrorMessages: ErrorMessages<UserErrorCodes> = {
    [UserErrorCodes.USER_DOES_NOT_EXIST]: 'User does not exist',
};

export const UserErrorStatuses: ErrorStatuses<UserErrorCodes> = {
    [UserErrorCodes.USER_DOES_NOT_EXIST]: StatusCodes.CONFLICT
};
