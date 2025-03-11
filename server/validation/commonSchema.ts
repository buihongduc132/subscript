import { z } from 'zod';

export const UUIDValidator = (field: string = 'id') => z.string().uuid({
    message: `${field} must be UUID`,
});

export const CommonValidator = {
    id: UUIDValidator('id'),
}

export const StringToNumValidator = () => z
    .coerce.number()

export const PagedSchema = {
    limit: StringToNumValidator()
        .refine(n => n > 0 && n <= 100, 'Limit must in range 1->100')
        .default(10)
    ,
    offset: StringToNumValidator()
        .refine(n => n >= 0, 'Offset must >= 0')
        .default(0)
    ,
}

export const PagedValidator = z.object({
    query: z.object(PagedSchema),
});

export const ParamValidators = (fields: string[]) => z.object({
    params: z.object(fields.reduce((prev, f) => {
        prev[f] = UUIDValidator(f);
        return prev;
    }, {})),
});
