import { z } from "zod";
import { AttributesToZod } from "./helpers";
import { ICreationProjectModel, IProjectModel, IRelUserProject } from "@/model";

export const projectSchema = z.object<AttributesToZod<IProjectModel>>({
  name: z.string(),
});

export const projectCreationSchema = z.object<AttributesToZod<ICreationProjectModel>>({
  name: z.string(),
});

export const assignUserProjectScema = z.object<AttributesToZod<IRelUserProject>>({
  user_id: z.string(),
  project_id: z.string(),
  permission: z.string(),
});

export const assignUserProjectValidator = z.object({
  body: assignUserProjectScema
});

export const createProjectValidator = z.object({
  body: projectCreationSchema
});
