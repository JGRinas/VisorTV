import { ERoleDTO } from "~/modules/auth/domain/dtos/request";

export interface IUser {
  _id: string;
  email: string;
  role: ERoleDTO;
  name: string;
  surname: string;
}

export interface IUserResponse {
  users: IUser[];
  totalPages: number;
  currentPage: number;
}
