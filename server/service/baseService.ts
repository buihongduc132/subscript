import { Cradle } from "@/container";

export class BaseService {
  repo: Cradle['repo']
  logger: Cradle['logger']

  constructor(deps, opts) {
    this.repo = deps.repo;
    this.logger = deps.logger;
  }
}