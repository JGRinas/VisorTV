import { API } from "~/config/axios";
import { IAuthRepository } from "../domain/repository";
import { ILoginRequestDTO } from "../domain/dtos/request";

export function createAuthRepository(): IAuthRepository {
  return { login, getProfile };
}

async function login(params: ILoginRequestDTO) {
  const { data } = await API.AUTH.post("login", params);
  return data;
}

async function getProfile() {
  const { data } = await API.USER.get("profile");
  return data;
}
