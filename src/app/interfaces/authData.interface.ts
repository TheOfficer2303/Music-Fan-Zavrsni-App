import { User } from "../services/auth/user.model";

export interface IAuthData {
    token: string,
    currentUser: User
}