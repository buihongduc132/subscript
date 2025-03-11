import { UserService } from "@/service/userService"

export const getServices = (deps) => {
  return {
    user: new UserService(deps, {}),
  }
}
