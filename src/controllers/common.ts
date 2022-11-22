import { NextFunction, Request, Response } from 'express';

export type Controller<I> =
    (req: Omit<Request, 'body'> & { body: I }, res: Response, next: NextFunction) =>
    Promise<void>;
