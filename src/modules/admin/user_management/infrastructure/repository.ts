import { API } from "~/config/axios";
import { IAdminRepository } from "../domain/repository";
import { IGetUsersParamsDTO } from "../domain/dtos/request";

export function createAdminRepository(): IAdminRepository {
  return { getUsers };
}

async function getUsers({ limit, page }: IGetUsersParamsDTO) {
  const { data } = await API.USER.get(
    `list-users?page=${page ?? 1}&limit=${limit ?? 10}`
  );
  return data;
}
