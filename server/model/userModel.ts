import { IBaseModel } from "./baseModel";

type UserFields = {
  email: string
  password: string
}

export type IUserModel = IBaseModel & Omit<UserFields, 'password'>;
export type ICreationUserModel = UserFields;

export type IRelUserProject = {
  user_id: string,
  project_id: string,
  permission: string,
}
