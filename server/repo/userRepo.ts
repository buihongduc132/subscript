import { hash } from "@/helpers/auth/hash";
import { BaseRepo } from "./baseRepo";
import { ICreationUserModel, IRelUserProject, IUserModel } from "@/model";
import { Knex } from "knex";

export class UserRepo extends BaseRepo<
  IUserModel,
  ICreationUserModel
> {
  userProject: Knex.QueryBuilder
  constructor(deps, opts) {
    super(deps, {
      ...opts,
      tableName: 'users',
    });

    this.userProject = this._knex('rel_user_project');
  }

  create = async (data: { email: string; password: string; }) => {
    const { password, ...restUserInfo } = data;
    const hashPassword = hash(password);
    return await this.knex.insert({ ...restUserInfo, password: hashPassword }).onConflict(['email']).ignore();
  }

  getProjectsByUserId = async(userId: string) => {
    return await this._knex('projects as p')
      .leftJoin('rel_user_project as r_up', 'p.id', 'r_up.project_id')
      .where('r_up.user_id', userId);
  }

  addProjectRole = async (payload: IRelUserProject) => {
    return await this.userProject.insert(payload);
  }

  removeProjectRole = async (userId: string, projectId: string) => {
    return await this.userProject.where({ user_id: userId, project_id: projectId }).del();
  }
}
