// src/controllers/AuthController.ts
import type { IUser } from "../interfaces/IUser";
import { UserService } from "../services/UserService";
import { get, post, requestBody } from "../apiDecorators";

export class AuthController {
  @post("/register")
  static async register(@requestBody user: IUser): Promise<IUser | null> {
    await new Promise(res => setTimeout(res, 300)); // simulate delay
    return UserService.register(user);
  }

  @post("/login")
  static async login(@requestBody credentials: { email: string; password: string }): Promise<IUser | null> {
    await new Promise(res => setTimeout(res, 300)); // simulate delay
    return UserService.login(credentials.email, credentials.password);
  }

  @get("/users")
  static async getAllUsers(): Promise<IUser[]> {
    await new Promise(res => setTimeout(res, 300)); // simulate delay
    return UserService.getUsers();
  }
}