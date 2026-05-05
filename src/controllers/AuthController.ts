import { UserService } from "../services/UserService";
import type { IUser } from "../interfaces/IUser";

export class AuthController {
  static register(user: IUser): IUser | null {
    return UserService.register(user);
  }

  static login(email: string, password: string): IUser | null {
    return UserService.login(email, password);
  }
}