import type { IUser } from "../interfaces/IUser";

const USERS_KEY = "users";

export class UserService {
  static getUsers(): IUser[] {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveUsers(users: IUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  static register(user: IUser): IUser | null {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) return null;
    user.id = Date.now();
    users.push(user);
    this.saveUsers(users);
    return user;
  }

  static login(email: string, password: string): IUser | null {
    const users = this.getUsers();
    return users.find(u => u.email === email && u.password === password) || null;
  }
}