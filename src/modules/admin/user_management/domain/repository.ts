import { IGetUsersParamsDTO } from "./dtos/request";
import { IUserResponse } from "./dtos/response";

export interface IAdminRepository {
  getUsers: (params: IGetUsersParamsDTO) => Promise<IUserResponse>;
}
