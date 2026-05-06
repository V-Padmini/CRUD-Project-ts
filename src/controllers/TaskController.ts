// src/controllers/TaskController.ts
import type { ITask } from "../interfaces/ITask";
import { TaskService } from "../services/TaskService";
import { get, post, put, del, requestBody, param } from "../apiDecorators";

export class TaskController {
  @get("/tasks")
  static async getTasks(): Promise<ITask[]> {
    await new Promise(res => setTimeout(res, 200));
    return TaskService.getTasks();
  }

  @post("/tasks")
  static async addTask(@requestBody task: ITask): Promise<ITask> {
    await new Promise(res => setTimeout(res, 200));
    return TaskService.addTask(task);
  }

  @put("/tasks/{id}")
  static async updateTask(
    @param("path", "id") id: number,
    @requestBody task: Partial<ITask>
  ): Promise<ITask | null> {
    await new Promise(res => setTimeout(res, 200));
    return TaskService.updateTask(id, task);
  }

  @del("/tasks/{id}")
  static async deleteTask(@param("path", "id") id: number): Promise<boolean> {
    await new Promise(res => setTimeout(res, 200));
    return TaskService.deleteTask(id);
  }
}