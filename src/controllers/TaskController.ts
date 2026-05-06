// src/controllers/TaskController.ts
import type { ITask } from "../interfaces/ITask";
import { TaskService } from "../services/TaskService";

export class TaskController {
  // Get all tasks
  static getTasks(): ITask[] {
    return TaskService.getTasks();
  }

  // Add a new task
  static addTask(task: ITask): ITask {
    return TaskService.addTask(task);
  }

  // Update a task by id
  static updateTask(id: number | string, task: Partial<ITask>): ITask | null {
    return TaskService.updateTask(id, task);
  }

  // Delete a task by id
  static deleteTask(id: number | string): boolean {
    return TaskService.deleteTask(id);
  }
}