import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// type PrismaErrorVariant =
//     { tag: 'kreq', err: PrismaClientKnownRequestError } |
//     { tag: 'ureq', err: PrismaClientUnknownRequestError } |
//     { tag: 'vald', err: PrismaClientValidationError } |
//     { tag: 'init', err: PrismaClientInitializationError } |
//     { tag: 'rust', err: PrismaClientRustPanicError } |
//     { tag: 'othr', err: unknown };

// export class PrismaError {
//     #x: PrismaErrorVariant;

//     // hash map
//     private constructor(e: unknown) {
//         if(e instanceof PrismaClientKnownRequestError) {
//             this.#x = { tag: 'kreq', err: e };
//         }
//         else if(e instanceof PrismaClientUnknownRequestError) {
//             this.#x = { tag: 'ureq', err: e };
//         }
//         else if(e instanceof PrismaClientValidationError) {
//             this.#x = { tag: 'vald', err: e };
//         }
//         else if(e instanceof PrismaClientInitializationError) {
//             this.#x = { tag: 'init', err: e };
//         }
//         else if(e instanceof PrismaClientRustPanicError) {
//             this.#x = { tag: 'rust', err: e };
//         }
//         else {
//             this.#x = { tag: 'othr', err: e };
//         }
//     }

//     static async catchAsync<T>(promise: Promise<T>): Promise<Result<T, PrismaError>> {
//         const resultUnknownErr = await Result.catchAsync(promise);
//         return resultUnknownErr.mapErr((e) => new PrismaError(e));
//     }
//     static catch<T>(action: () => T): Result<T, PrismaError> {
//         return Result.catch(action).mapErr((e) => new PrismaError(e));
//     }

//     elim<X>(
//         f1: (_: PrismaClientKnownRequestError) => X,
//         f2: (_: PrismaClientUnknownRequestError) => X,
//         f3: (_: PrismaClientValidationError) => X,
//         f4: (_: PrismaClientInitializationError) => X,
//         f5: (_: PrismaClientRustPanicError) => X,
//         f6: (_: unknown) => X
//     ) {
//         switch(this.#x.tag) {
//             case 'kreq': return f1(this.#x.err);
//             case 'ureq': return f2(this.#x.err);
//             case 'vald': return f3(this.#x.err);
//             case 'init': return f4(this.#x.err);
//             case 'rust': return f5(this.#x.err);
//             default: return f6(this.#x.err);
//         }
//     }

//     elimKnown<X>(onKnown: (_: PrismaClientKnownRequestError) => X, onNotKnown: (_: unknown) => X): X {
//         return this.elim(
//             onKnown,
//             onNotKnown,
//             onNotKnown,
//             onNotKnown,
//             onNotKnown,
//             onNotKnown,
//         );
//     }

//     toErr(onKnown?: (_: PrismaClientKnownRequestError) => null | RespondedError): RespondedError {
//         return this.elim(
//             (e) => {
//                 if(!onKnown) return new InternalError(`Prisma(K): ${e}`);
//                 const k = onKnown(e);
//                 if(k === null) return new InternalError(`Prisma(K): ${e}`);
//                 return k;
//             },
//             (e) => new InternalError(`Prisma(U): ${e}`),
//             (e) => new InternalError(`Prisma(V): ${e}`),
//             (e) => new InternalError(`Prisma(I): ${e}`),
//             (e) => new InternalError(`Prisma(R): ${e}`),
//             (e) => new InternalError(`Prisma(?): ${e}`),
//         );
//     }
// }
