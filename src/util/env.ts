import { InternalErrorCodes } from '~/constants/errors/internal';
import { InternalError } from '~/errors/common';


function env<T>(name: string, parser: (v: string) => T | null): T {
    const value = process.env[name];
    if(!value) throw new InternalError(InternalErrorCodes.NO_ENV_VAR, name);
    const parsed = parser(value);
    if(parsed === null) throw new InternalError(InternalErrorCodes.BAD_ENV_VAR, name);
    return parsed;
}

export function envString(name: string, regex?: RegExp): string {
    return env(name, regex
        ? (str) => (regex.test(str) ? str : null)
        : (str) => str
    );
}

export function envInt(name: string, radix?: number): number {
    return env(name, (str) => {
        const num = Number.parseInt(str, radix);
        return Number.isNaN(num) ? null : num;
    });
}

export default env;
