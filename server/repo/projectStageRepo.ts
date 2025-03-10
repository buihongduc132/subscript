import { BaseRepo, BaseRepoOpt } from "./baseRepo";
import { ICreationProjectStageModel, IProjectStageModel } from "@/model";


export class ProjectStageRepo extends BaseRepo<
  IProjectStageModel,
  ICreationProjectStageModel
> {
  constructor(deps, opts) {
    super(deps, {
      ...opts,
      tableName: 'project_stages',
    });
  }
}