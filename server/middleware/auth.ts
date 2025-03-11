import { UserProjectRole } from "@/const/roles";
import { handleRes } from "@/helpers";
import { decodeJWT, verifyJWT } from "@/helpers/auth/jwt";
import { RestResponse } from "@/helpers/restResponse";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import _ from 'lodash';

export const jwtAuth: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const validToken = await verifyJWT(token);
  if (!validToken) {
    handleRes(
      RestResponse.failure(null, { status: StatusCodes.UNAUTHORIZED, message: 'UNAUTHORIZED' }),
      res
    );
    return;
  }

  req.user = await decodeJWT(token);
  next();
}

export const isSuperAdmin = () => async (req, res, next) => {
  if (!req.user.isSuperAdmin) {
    handleRes(
      RestResponse.failure(null, { status: StatusCodes.FORBIDDEN, message: 'FORBIDDEN' }),
      res
    );
    return;
  }

  next();
}

export const inProjectRoles = (roles: UserProjectRole[]) => async (req, res, next) => {
  const { projectId } = req.params;
  const projectRoles = _.get(req.user, ['projectRoles', projectId], []);

  const hasRole = _.intersection(roles, projectRoles);
  if (!hasRole.length) {
    handleRes(
      RestResponse.failure(null, { status: StatusCodes.FORBIDDEN, message: 'FORBIDDEN' }),
      res
    );
    return;
  }

  next();
}
