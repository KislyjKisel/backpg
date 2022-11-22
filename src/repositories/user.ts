import { Prisma, User } from '@prisma/client';
import { prisma } from '../util/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaKnownErrorCodes } from '../constants/prisma';

/**
 * @returns null when the user already exists
 */
export async function addUser(user: Prisma.UserCreateInput): Promise<User | null> {
    try {
        return await prisma.user.create({ data: user });
    }
    catch(e) {
        if(e instanceof PrismaClientKnownRequestError && e.code == PrismaKnownErrorCodes.UniqueConstraintFailed) {
            return null;
        }
        else {
            throw e;
        }
    }
}

export function findUserByLogin(login: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            login
        }
    });
}

export function findUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}
