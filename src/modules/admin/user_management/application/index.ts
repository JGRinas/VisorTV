import {
  IEditUserRequestDTO,
  IGetUsersParamsDTO,
} from "../domain/dtos/request";
import { IAdminRepository } from "../domain/repository";

export function getUsers(repository: IAdminRepository) {
  return async function (params: IGetUsersParamsDTO) {
    return await repository.getUsers(params);
  };
}

export function deleteUser(repository: IAdminRepository) {
  return async function (id: string) {
    return await repository.deleteUser(id);
  };
}

export function editUser(repository: IAdminRepository) {
  return async function (id: string, payload: IEditUserRequestDTO) {
    return await repository.editUser(id, payload);
  };
}
