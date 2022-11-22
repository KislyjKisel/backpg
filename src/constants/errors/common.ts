import { StatusCodes } from 'http-status-codes';

type CodeMap<C extends number, V> = {
    [T in C]: {
        [i: number]: V
    }[T]
};

export type ErrorNames<C extends number> = CodeMap<C, string>;
export type ErrorMessages<C extends number> = CodeMap<C, string>;
export type ErrorStatuses<C extends number> = CodeMap<C, StatusCodes>;
