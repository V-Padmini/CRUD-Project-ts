import { TaskService } from "../services/TaskService";
import type{ ITask } from "../interfaces/ITask";

export class TaskController {
  static getTasks(userId: number): ITask[] {
    return TaskService.getTasks(userId);
  }

  static addTask(title: string, description: string, userId: number): ITask {
    return TaskService.addTask({ title, description, userId });
  }

  static updateTask(id: number, title: string, description: string): ITask | null {
    return TaskService.updateTask(id, { title, description });
  }

  static deleteTask(id: number): boolean {
    return TaskService.deleteTask(id);
  }
}