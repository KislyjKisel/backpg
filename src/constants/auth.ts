import { envString } from '~/util/env';
import { TTL_PATTERN } from '~/validation/auth';


export const JWT_ACCESS_KEY = envString('JWT_ACCESS_KEY');
export const JWT_REFRESH_KEY = envString('JWT_REFRESH_KEY');
export const JWT_ACCESS_TTL = envString('JWT_ACCESS_TTL', TTL_PATTERN);
export const JWT_REFRESH_TTL = envString('JWT_REFRESH_TTL', TTL_PATTERN);
