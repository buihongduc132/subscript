import { ProjectRepo, ProjectStageRepo, UserRepo } from '@/repo';

export const getRepos = (deps) => {
  return {
    user: new UserRepo(deps, {}),
    project: new ProjectRepo(deps, {}),
    projectStage: new ProjectStageRepo(deps, {}),
  }
}
