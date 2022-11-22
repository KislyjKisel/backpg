export type Service<I, O> = (input: I) => Promise<O>;
