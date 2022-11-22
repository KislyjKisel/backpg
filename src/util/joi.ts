import Joi from 'joi';
import Result from './result';

export function validate<T>(
    schema: Joi.Schema<T>,
    value: T,
    opts?: Joi.ValidationOptions | undefined
): Result<T, Joi.ValidationError> {
    const joiValidationResult = schema.validate(value, opts);
    return joiValidationResult.error
        ? Result.err(joiValidationResult.error)
        : Result.ok(joiValidationResult.value);
}
