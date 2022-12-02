import PostError from '~/errors/post';

import { makeErrorHandler } from './common';


export const postErrorHandler = makeErrorHandler(PostError);
