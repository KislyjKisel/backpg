import jwt from 'jsonwebtoken';

export function createToken(privateKey: string, data: jwt.JwtPayload, opts?: jwt.SignOptions | undefined): string {
    return jwt.sign(data, privateKey, opts);
}

export function verifyToken(privateKey: string, token: string): jwt.JwtPayload {
    return <jwt.JwtPayload>jwt.verify(token, privateKey);
}

export const tokenRegexString = '[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+';
