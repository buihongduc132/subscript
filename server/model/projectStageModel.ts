import { IBaseModel } from "./baseModel";

type ProjectStageFields = {
  name: string
  project_id: string
  order: number
  config: object
}

export type IProjectStageModel = IBaseModel & ProjectStageFields;
export type ICreationProjectStageModel = Partial<IBaseModel> & ProjectStageFields;