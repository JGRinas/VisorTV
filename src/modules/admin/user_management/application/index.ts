import { IGetUsersParamsDTO } from "../domain/dtos/request";
import { IAdminRepository } from "../domain/repository";

export function getUsers(repository: IAdminRepository) {
  return async function (params: IGetUsersParamsDTO) {
    return await repository.getUsers(params);
  };
}
