import { IScreenPayload } from "../domain/dtos/request";
import { IScreenRepository } from "../domain/repository";

export function createScreen(repository: IScreenRepository) {
  return async function (params: IScreenPayload) {
    return await repository.createScreen(params);
  };
}

export function updateScreen(repository: IScreenRepository) {
  return async function (params: IScreenPayload, id: string) {
    return await repository.updateScreen(params, id);
  };
}

export function getAssignedScreen(repository: IScreenRepository) {
  return async function () {
    return await repository.getAssignedScreen();
  };
}
