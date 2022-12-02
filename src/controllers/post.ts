import { StatusCodes } from 'http-status-codes';

import { InternalErrorCodes } from '~/constants/errors/internal';
import { InternalError } from '~/errors/common';
import postServices from '~/services/post';

import { Controller, GetController } from './common';


const createPostController: Controller<{ title: string, text: string }> = async (req, res, next) => {
    try {
        if(!req.auth) {
            throw new InternalError(InternalErrorCodes.NOT_AUTHENTICATED);
        }
        const createdPost = await postServices.create({
            title: req.body.title,
            text: req.body.text,
            authorId: req.auth.id,
        });
        res.status(StatusCodes.CREATED).send(createdPost);
    }
    catch(e) {
        next(e);
    }
};

const viewPostController: GetController = async (req, res, next) => {
    try {
        const postId = Number.parseInt(req.query.id?.toString() || '');
        const post = await postServices.view({ postId });
        res.status(StatusCodes.OK).send({
            title: post.title,
            text: post.text,
            authorId: post.authorId,
        });
    }
    catch(e) {
        next(e);
    }
};

const postControllers = {
    create: createPostController,
    view: viewPostController,
};

export default postControllers;
