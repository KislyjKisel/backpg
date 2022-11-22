import { ErrorMessages, ErrorNames } from './common';

export enum InternalErrorCodes {
    NO_ENV_VAR = 1,
    BAD_ENV_VAR = 2,
    UNREACHABLE = 3,
    NOT_VALIDATED = 4,
}

export const InternalErrorNames: ErrorNames<InternalErrorCodes> = {
    [InternalErrorCodes.NO_ENV_VAR]: 'NO_ENV_VAR',
    [InternalErrorCodes.BAD_ENV_VAR]: 'BAD_ENV_VAR',
    [InternalErrorCodes.UNREACHABLE]: 'UNREACHABLE',
    [InternalErrorCodes.NOT_VALIDATED]: 'NOT_VALIDATED',
};

export const InternalErrorReasons: ErrorMessages<InternalErrorCodes> = {
    [InternalErrorCodes.NO_ENV_VAR]: 'Environment variable "%s" is undefined',
    [InternalErrorCodes.BAD_ENV_VAR]: 'Environment variable "%s" is in incorrect format',
    [InternalErrorCodes.UNREACHABLE]: 'Unreachable reached',
    [InternalErrorCodes.NOT_VALIDATED]: 'Request data "%s" did not pass validation',
};
