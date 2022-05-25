import { User } from "../models/user.model";

export interface IAuthData {
    token: string,
    currentUser: User
}