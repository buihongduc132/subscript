import { Cradle } from "@/container"
import { IBaseModel } from "@/model/baseModel"
import { Knex } from "knex"
import { Logger } from "winston"

export type BaseRepoOpt = {
  tableName: string
}

export type WithCountOptions = {
  limit?: number,
  offset?: number,
}

export class BaseRepo<T extends IBaseModel, U> {
  Repo: T
  tableName: string
  logger: Cradle['logger']
  knex: Knex
  k: Knex

  constructor(deps, opts: BaseRepoOpt) {
    this.tableName = opts.tableName;
    this.logger = (deps.logger as Logger).child({
      ns: `Repo:${opts.tableName}`,
    });
    this.knex = deps.knex(this.tableName);
    this.k = this.knex;
  }

  _knexById = (id: string)  => this.knex.where({ id });

  findWithCount = async (opts: WithCountOptions) => {
    return await this.knex.limit(opts.limit).offset(opts.offset);
  }

  create = async (data: U) => {
    return await this.knex.insert(data);
  }

  getById = async (id: string) => {
    return await this._knexById(id);
  }

  updateById = async (id: string, props: Knex.DbRecordArr<Partial<T>>) => {
    return await this._knexById(id).update(props).returning('*');
  }

  deleteById = async (id: string) => {
    return await this._knexById(id).del();
  }
}