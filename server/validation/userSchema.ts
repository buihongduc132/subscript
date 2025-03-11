import { z } from "zod";
import { AttributesToZod, AttributesToZodStrict } from "./helpers";
import { ICreationUserModel, IRelUserProject, IUserModel } from "@/model/userModel";

export const userSchema = z.object<AttributesToZod<IUserModel>>({
  email: z.string(),
  id: z.string(),
});

export const userCreationSchema = z.object<AttributesToZod<ICreationUserModel>>({
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  })
});

export const UserRegistrationValidation = userCreationSchema;