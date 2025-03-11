import { container, Cradle } from "@/container"

export class BaseController {
  repo: Cradle['repo']

  constructor() {
    this.repo = container.resolve('repo');
  }
}
