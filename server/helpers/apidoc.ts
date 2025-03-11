import { z } from "zod";

import { AttributesToZod } from "@/validation/helpers";
import { RestResponse } from "./restResponse";

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object<AttributesToZod<RestResponse>>({
        success: z.boolean(),
        message: z.string(),
        data: dataSchema.optional(),
    });


export function createApiResponse(schema: z.ZodTypeAny, description: string) {
    return {
        description,
        content: {
            "application/json": {
                schema: ServiceResponseSchema(schema),
            },
        },
    };
}
