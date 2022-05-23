import { User } from "../services/user/user.model";

export interface IAuthData {
    token: string,
    currentUser: User
}