import { StatusCodes } from 'http-status-codes';

import { ErrorMessages, ErrorNames, ErrorStatuses } from './common';


export enum PostErrorCodes {
    POST_NOT_FOUND = 1,
}

export const PostErrorNames: ErrorNames<PostErrorCodes> = {
    [PostErrorCodes.POST_NOT_FOUND]: 'POST_NOT_FOUND',
};

export const PostErrorMessages: ErrorMessages<PostErrorCodes> = {
    [PostErrorCodes.POST_NOT_FOUND]: 'Post not found',
};

export const PostErrorStatuses: ErrorStatuses<PostErrorCodes> = {
    [PostErrorCodes.POST_NOT_FOUND]: StatusCodes.NOT_FOUND
};
