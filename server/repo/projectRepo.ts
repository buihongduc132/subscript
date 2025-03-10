import { BaseRepo, BaseRepoOpt } from "./baseRepo";
import { ICreationProjectModel, IProjectModel } from "@/model";

export class ProjectRepo extends BaseRepo<
  IProjectModel,
  ICreationProjectModel
> {
  constructor(deps, opts) {
    super(deps, {
      ...opts,
      tableName: 'projects',
    });
  }
}
