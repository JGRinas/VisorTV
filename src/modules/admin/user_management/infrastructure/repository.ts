import { API } from "~/config/axios";
import { IAdminRepository } from "../domain/repository";
import {
  IEditUserRequestDTO,
  IGetUsersParamsDTO,
  IRegisterUserDTO,
} from "../domain/dtos/request";

export function createAdminRepository(): IAdminRepository {
  return { getUsers, deleteUser, editUser, registerUser };
}

async function getUsers({ limit, page }: IGetUsersParamsDTO) {
  const { data } = await API.USER.get(
    `list-users?page=${page ?? 1}&limit=${limit ?? 10}`
  );
  return data;
}

async function deleteUser(id: string) {
  await API.USER.delete(`${id}`);
}

async function editUser(id: string, payload: IEditUserRequestDTO) {
  const { data } = await API.USER.put(`${id}`, payload);
  return data;
}

async function registerUser(payload: IRegisterUserDTO) {
  const { data } = await API.USER.post("register-user", payload);
  return data;
}
