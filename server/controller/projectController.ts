import { asyncHandler, handleRes } from "@/helpers";
import { BaseController } from "./baseController";
import { NextFunction, Request, RequestHandler } from "express";
import { ICreationProjectModel } from "@/model";
import { RestResponse } from "@/helpers/restResponse";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ProjectController extends BaseController {
  constructor() {
    super();
  }

  addProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.repo.project.create(req.body);
    handleRes(RestResponse.success(data, { status: StatusCodes.CREATED }), res);
  });

  assignUserToProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.repo.user.addProjectRole(req.body);
    handleRes(RestResponse.success(data, { status: StatusCodes.CREATED }), res);
  });

  getUserProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const data = await this.repo.user.getProjectsByUserId(id);
    handleRes(RestResponse.success(data), res);
  });

  getProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.repo.project.getById(req.params.projectId);
    if(!data.length) {
      handleRes(RestResponse.failure(null, { message: 'Not found', status: 404 }), res);
      return;
    }
    handleRes(RestResponse.success(data[0]), res);
  });

  getProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.repo.project.findWithCount(req.query);
    handleRes(RestResponse.success(data), res);
  });
}
