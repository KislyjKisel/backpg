import { envInt } from '~/util/env';


export const loginMinLength = envInt('LOGIN_MIN_LENGTH');
export const loginMaxLength = envInt('LOGIN_MAX_LENGTH');
export const passwordMinLength = envInt('PASSWORD_MIN_LENGTH');
export const passwordMaxLength = envInt('PASSWORD_MAX_LENGTH');

const firstNameMinLength = envInt('FIRSTNAME_MIN_LENGTH');
const firstNameMaxLength = envInt('FIRSTNAME_MAX_LENGTH');
const lastNameMinLength = envInt('LASTNAME_MIN_LENGTH');
const lastNameMaxLength = envInt('LASTNAME_MAX_LENGTH');

export const FIRSTNAME_PATTERN = new RegExp(`^[A-Za-z]{${firstNameMinLength},${firstNameMaxLength}}$`);
export const LASTNAME_PATTERN = new RegExp(`^[A-Za-z]{${lastNameMinLength},${lastNameMaxLength}}$`);
