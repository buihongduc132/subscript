import { UserController } from "@/controller/userController";
import { handleRes, RestResponse, validateRequest } from "@/helpers";
import { createApiResponse, ServiceResponseSchema } from "@/helpers/apidoc";
import { jwtAuth } from "@/middleware/auth";
import { UserLoginSchema, UserRegistrationValidation } from "@/validation/userSchema";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Response, Express } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export const applyAuthRoute = (app: Express) => {
  const userController = new UserController();
  app.post('/me', 
    jwtAuth,
    userController.getMe,
  );
  app.post('/login', 
    validateRequest(UserLoginSchema),
    userController.login,
  );
  app.post('/register', 
    validateRequest(UserRegistrationValidation),
    userController.addUser,
  );
}

// export const healthRouter = (_req: Request, res: Response) => {
//   const restResponse = RestResponse.success(null, { message: 'ok' });
//   handleRes(restResponse, res);
// }

// const registry = new OpenAPIRegistry();
// registry.registerPath({
//   tags: ['health'],
//   method: 'get',
//   description: "Check server health",
//   path: '/health',
//   responses: {
//     [StatusCodes.OK]: createApiResponse(
//       ServiceResponseSchema(z.object({})), 'ok',
//     )
//   }
// });

// export const healthRouterDoc = registry;