import { Controller, GetController } from './common';
import services from '@services/post';
import { InternalError } from '@errors/common';
import { InternalErrorCodes } from '@constants/errors/internal';
import { StatusCodes } from 'http-status-codes';

const createPostController: Controller<{ title: string, text: string }> = async (req, res, next) => {
    try {
        if(!req.auth) {
            throw new InternalError(InternalErrorCodes.NOT_AUTHENTICATED);
        }
        console.log('!!!!', req.body);
        const createdPost = await services.create({
            title: req.body.title,
            text: req.body.text,
            authorId: req.auth.id,
        });
        res.status(StatusCodes.OK).send(createdPost);
    }
    catch(e) {
        next(e);
    }
};

const viewPostController: GetController = async (req, res, next) => {
    try {
        const postId = Number.parseInt(req.query.id?.toString() || '');
        const post = await services.view({ postId });
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

export default {
    create: createPostController,
    view: viewPostController,
};
