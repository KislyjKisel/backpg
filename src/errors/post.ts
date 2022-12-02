import { PostErrorMessages, PostErrorNames, PostErrorStatuses } from '~/constants/errors/post';

import { makeErrorClass } from './common';


const PostError = makeErrorClass(
    PostErrorNames,
    PostErrorMessages,
    PostErrorStatuses,
);

export default PostError;
