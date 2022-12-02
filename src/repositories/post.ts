import { Post } from '@prisma/client';

import { prisma } from '~/util/prisma';


export async function addPost(post: { title: string, text: string, authorId: number }): Promise<Post> {
    return await prisma.post.create({
        data: {
            title: post.title,
            text: post.text,
            author: { connect: { id: post.authorId } },
        }
    });
}

export function findPostById(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
        where: {
            id
        }
    });
}
