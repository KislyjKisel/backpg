// export type ReqSchema<T> =
//     (T extends { [Segments.BODY]: infer TBody } ? {
//         [Segments.BODY]: AnySchema<TBody>
//     } : {}) &
//     (T extends { [Segments.HEADERS]: infer THeaders } ? {
//         [Segments.HEADERS]: AnySchema<THeaders>
//     } : {});

// export type ReqData<S> =
//     (S extends { [Segments.BODY]: infer TBody } ? {
//         [Segments.BODY]: TBody
//     } : {}) &
//     (S extends { [Segments.HEADERS]: infer THeaders } ? {
//         [Segments.HEADERS]: THeaders
//     } : {});

// export type ReqParser<S, T> = {
//     schema: ReqSchema<S>,
//     parse: (req: ReqData<S>) => T | null,
// };
