import { ERoleDTO } from "~/modules/auth/domain/dtos/request";

export interface IGetUsersParamsDTO {
  page?: number;
  limit?: number;
}

export interface IEditUserRequestDTO {
  email?: string;
  role?: ERoleDTO;
  name?: string;
}

export interface IRegisterUserDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}
