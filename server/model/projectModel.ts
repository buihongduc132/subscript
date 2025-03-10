import { IBaseModel } from "./baseModel";

type ProjectFields = {
  name: string
  org_id?: string
  config?: object
}

export type IProjectModel = IBaseModel & ProjectFields;
export type ICreationProjectModel = Partial<IBaseModel> & ProjectFields;