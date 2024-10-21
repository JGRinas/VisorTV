export interface IUser {
  _id: string;
  email: string;
  role: string;
  name: string;
}

export interface IUserResponse {
  users: IUser[];
  totalPages: number;
  currentPage: number;
}
