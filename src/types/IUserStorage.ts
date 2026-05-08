import type { IUser } from "./IUser";

export interface IUserStorage extends IUser {
  password: string;
  id: string;
}