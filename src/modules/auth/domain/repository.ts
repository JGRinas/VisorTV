import { ILoginRequestDTO } from "./dtos/request";
import { ILoginResponseDTO } from "./dtos/response";

export interface IAuthRepository {
  login: (data: ILoginRequestDTO) => Promise<ILoginResponseDTO>;
}
