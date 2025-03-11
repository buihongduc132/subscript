import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { RestResponse, handleRes } from "@/helpers";
import { ENV } from '@/config';

export const addErrorToRequestLog: ErrorRequestHandler = async (err, _req, res, next) => {
  res.locals.err = err;

  next();
};

export const unexpectedRequest: RequestHandler = async (_req, res, next) => {
  const err = res.locals.err;
  if (!err) {
    next();
    return;
  }

  if (ENV.NODE_ENV == 'production') {
    delete err.stack;
  }

  handleRes(RestResponse.failure(err, {
    message: `Server error: ${err.message}`,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  }), res);
};
