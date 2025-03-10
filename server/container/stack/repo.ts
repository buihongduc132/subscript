import { ProjectRepo, ProjectStageRepo } from '@/repo';

export const getRepos = (deps) => {
  return {
    project: new ProjectRepo(deps, {}),
    projectStage: new ProjectStageRepo(deps, {}),
  }
}