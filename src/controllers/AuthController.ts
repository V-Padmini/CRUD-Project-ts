// src/controllers/AuthController.ts
import type { IUser } from "../interfaces/IUser";
import { UserService } from "../services/UserService";

export class AuthController {
  // Register a new user
  static register(user: IUser): IUser | null {
    return UserService.register(user);
  }

  // Login user
  static login(credentials: { email: string; password: string }): IUser | null {
    return UserService.login(credentials.email, credentials.password);
  }

  // Get all users (optional)
  static getAllUsers(): IUser[] {
    return UserService.getUsers();
  }
}