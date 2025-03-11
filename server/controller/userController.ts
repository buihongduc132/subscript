import { NextFunction, Request, RequestHandler } from "express";
import { BaseController } from "./baseController";
import { asyncHandler, handleRes } from "@/helpers";
import { RestResponse } from "@/helpers/restResponse";
import { Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { comparePassword } from "@/helpers/auth/hash";
import { signJWT } from "@/helpers/auth/jwt";
import _ from "lodash";
import { createProjectValidator } from "@/validation/projectSchema";

const INVALID_ERR = 'Invalid Username / Password';

export class UserController extends BaseController {
  constructor() {
    super();
  }

  getMe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const existed = await this.repo.user.getById(id);
    if(existed && existed.length) {
      handleRes(RestResponse.failure(null, { message: 'User not found', status: 404 }), res);
      return;
    }

    const { password, ...restUserInfo } = existed[0];

    handleRes(RestResponse.success(restUserInfo), res);
  });

  addUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const existed = await this.repo.user.findOne({ email });
    if(existed && existed.length) {
      handleRes(RestResponse.failure(null, { message: 'User existed', status: 401 }), res);
      return;
    }

    const data = await this.repo.user.create(req.body);
    handleRes(RestResponse.success(data, { status: StatusCodes.CREATED }), res);
  });

  getUserProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const projects = await this.repo.user.getProjectsByUserId(id);

    handleRes(RestResponse.success(projects), res);
  });

  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existed = await this.repo.user.findOne({ email });
    
    if(!existed.length) {
      handleRes(RestResponse.failure(null, { message: INVALID_ERR, status: 401 }), res);
      return;
    }

    const user = existed[0];
    const isMatch = comparePassword(password, user.password);
    
    if(!isMatch) {
      handleRes(RestResponse.failure(null, { message: INVALID_ERR, status: 401 }), res);
      return;
    }

    const roles = await this.repo.user.getProjectRoles(user.id);
    const projectRoles = _.chain(roles).groupBy('project_id').entries().reduce((prev, [prodictId, rels]) => {
      prev[prodictId] = rels.map((r) => r.permission);
      return prev;
    }, {}).value();

    const userPayload = {
      ..._.omit(user, ['password']),
      projectRoles,
    }

    const token = signJWT(userPayload);

    handleRes(RestResponse.success({ token, userPayload }), res);
  });
}
