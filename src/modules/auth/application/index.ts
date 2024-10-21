import { ILoginRequestDTO } from "../domain/dtos/request";
import { IAuthRepository } from "../domain/repository";

export function login(repository: IAuthRepository) {
  return async function (params: ILoginRequestDTO) {
    return await repository.login(params);
  };
}

export function getProfile(repository: IAuthRepository) {
  return async function () {
    return await repository.getProfile();
  };
}
