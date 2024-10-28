import {
  IEditUserRequestDTO,
  IGetUsersParamsDTO,
  IRegisterUserDTO,
} from "./dtos/request";
import { IUser, IUserResponse } from "./dtos/response";

export interface IAdminRepository {
  getUsers: (params: IGetUsersParamsDTO) => Promise<IUserResponse>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (id: string, payload: IEditUserRequestDTO) => Promise<IUser>;
  registerUser: (payload: IRegisterUserDTO) => Promise<IUser>;
}
