import { AuthData } from '@middlewares/auth';

declare global {
    namespace Express {
        export interface Request {
            auth?: AuthData | null,
        }
    }
}
