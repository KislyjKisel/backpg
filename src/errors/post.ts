import { StatusCodes } from 'http-status-codes';

import { PostErrorCodes, PostErrorMessages, PostErrorNames, PostErrorStatuses } from '~/constants/errors/post';

export class PostError extends Error {
    status: StatusCodes;

    constructor(code: PostErrorCodes) {
        super(PostErrorMessages[code]);
        this.name = PostErrorNames[code];
        this.status = PostErrorStatuses[code];
    }
}
