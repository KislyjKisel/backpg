import { envInt, envString } from '~/util/env';


export const LOGIN_MIN_LENGTH = envInt('LOGIN_MIN_LENGTH');
export const LOGIN_MAX_LENGTH = envInt('LOGIN_MAX_LENGTH');
export const PASSWORD_MIN_LENGTH = envInt('PASSWORD_MIN_LENGTH');
export const PASSWORD_MAX_LENGTH = envInt('PASSWORD_MAX_LENGTH');

const FIRST_NAME_MIN_LENGTH = envInt('FIRSTNAME_MIN_LENGTH');
const FIRST_NAME_MAX_LENGTH = envInt('FIRSTNAME_MAX_LENGTH');
const LAST_NAME_MIN_LENGTH = envInt('LASTNAME_MIN_LENGTH');
const LAST_NAME_MAX_LENGTH = envInt('LASTNAME_MAX_LENGTH');

export const FIRSTNAME_PATTERN = new RegExp(`^[A-Za-z]{${FIRST_NAME_MIN_LENGTH},${FIRST_NAME_MAX_LENGTH}}$`);
export const LASTNAME_PATTERN = new RegExp(`^[A-Za-z]{${LAST_NAME_MIN_LENGTH},${LAST_NAME_MAX_LENGTH}}$`);

export const AVATAR_TYPE = envString('AVATAR_TYPE');
export const AVATAR_SIZE = envInt('AVATAR_SIZE');
export const AVATAR_FILESIZE_MAX_KB = envInt('AVATAR_FILESIZE_MAX_KB');
