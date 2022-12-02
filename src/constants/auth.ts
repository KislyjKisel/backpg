import { envString } from '~/util/env';
import { TTL_PATTERN } from '~/validation/auth';


export const jwtAccessKey = envString('JWT_ACCESS_KEY');
export const jwtRefreshKey = envString('JWT_REFRESH_KEY');
export const jwtAccessTtl = envString('JWT_ACCESS_TTL', TTL_PATTERN);
export const jwtRefreshTtl = envString('JWT_REFRESH_TTL', TTL_PATTERN);
