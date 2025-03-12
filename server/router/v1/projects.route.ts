import { Express } from "express";
import { UserController } from "@/controller/userController";
import { ProjectController } from "@/controller/projectController";
import { inProjectRoles, isSuperAdmin, jwtAuth } from "@/middleware/auth";
import { UserProjectRole } from "@/const/roles";
import { validateRequest } from "@/helpers";
import { assignUserProjectValidator, createProjectValidator } from "@/validation/projectSchema";
import { PagedValidator, ParamValidators } from "@/validation/commonSchema";

export const applyProjectRoute = (app: Express) => {
  const projectController = new ProjectController();

  const projectIdValidator = ParamValidators(['projectId']);

  app.get('/v1/projects', 
    jwtAuth,
    validateRequest(PagedValidator),
    projectController.getProjects
  );

  app.get('/v1/projects/:projectId', 
    validateRequest(projectIdValidator),
    jwtAuth,
    inProjectRoles([UserProjectRole.USER, UserProjectRole.ADMIN]),
    projectController.getProject,
  );

  app.post('/v1/projects', 
    jwtAuth,
    // inProjectRoles([UserProjectRole.ADMIN]),
    isSuperAdmin(),
    validateRequest(createProjectValidator),
    projectController.addProject
  );

  app.get('/v1/projects/:projectId/users',
    validateRequest(projectIdValidator),
    jwtAuth,
    inProjectRoles([UserProjectRole.ADMIN, UserProjectRole.USER]),
    projectController.getUserProjects,
  );
  
  app.get('/v1/projects/:projectId/users',
    validateRequest(projectIdValidator),
    jwtAuth,
    inProjectRoles([UserProjectRole.ADMIN, UserProjectRole.USER]),
    projectController.getUserProjects,
  );
  
  app.post('/v1/projects/:projectId/users',
    validateRequest(projectIdValidator),
    jwtAuth,
    inProjectRoles([UserProjectRole.ADMIN]),
    validateRequest(assignUserProjectValidator),
    projectController.assignUserToProject,
  );
}
