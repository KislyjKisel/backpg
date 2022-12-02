import { PostErrorCodes } from '~/constants/errors/post';
import PostError from '~/errors/post';
import { addPost, findPostById } from '~/repositories/post';

import { Service } from './common';


const createPostService: Service<
    { title: string, text: string, authorId: number },
    { postId: number }
> = async ({ title, text, authorId }) => {
    const post = await addPost({
        title, text, authorId,
    });
    return { postId: post.id };
};

const viewPostService: Service<
    { postId: number },
    { title: string, text: string, authorId: number }
> = async ({ postId }) => {
    const post = await findPostById(postId);
    if(post === null) {
        throw new PostError(PostErrorCodes.POST_NOT_FOUND);
    }
    return {
        title: post.title,
        text: post.text,
        authorId: post.authorId,
    };
};

const postServices = {
    create: createPostService,
    view: viewPostService,
};

export default postServices;
