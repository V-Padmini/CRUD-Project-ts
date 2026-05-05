import type { IUser } from "../interfaces/IUser";

let users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

const saveUsers = () => localStorage.setItem("users", JSON.stringify(users));

export class UserService {
  static register(user: IUser): IUser | null {
    if (users.find(u => u.email === user.email)) return null;
    user.id = users.length + 1;
    users.push(user);
    saveUsers();
    return user;
  }

  static login(email: string, password: string): IUser | null {
    return users.find(u => u.email === email && u.password === password) || null;
  }
}