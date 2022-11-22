import { StatusCodes } from 'http-status-codes';
import { ErrorMessages, ErrorNames, ErrorStatuses } from './common';

export enum PostErrorCodes {
    POST_ID_INVALID = 1,
}

export const PostErrorNames: ErrorNames<PostErrorCodes> = {
    [PostErrorCodes.POST_ID_INVALID]: 'POST_ID_INVALID',
};

export const PostErrorMessages: ErrorMessages<PostErrorCodes> = {
    [PostErrorCodes.POST_ID_INVALID]: 'Post id invalid',
};

export const PostErrorStatuses: ErrorStatuses<PostErrorCodes> = {
    [PostErrorCodes.POST_ID_INVALID]: StatusCodes.CONFLICT
};
