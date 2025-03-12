// TODO: Implement

import { handleRes, RestResponse } from "@/helpers";
import { Response } from 'express';

export * as v1Route from './v1';

export const applyHealthRouth = (app) => {
  app.get('/health', (_req: Request, res: Response) => {
    const restResponse = RestResponse.success(null, { message: 'ok' });
    handleRes(restResponse, res);
  });
}