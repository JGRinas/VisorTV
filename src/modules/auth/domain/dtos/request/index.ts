export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface IUserProfileDTO {
  _id: string;
  email: string;
  role: ERoleDTO;
  name: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
}

export enum ERoleDTO {
  ADMIN = "admin",
  OPERATOR = "operator",
}
