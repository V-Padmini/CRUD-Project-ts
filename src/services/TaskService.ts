import type { ITask } from "../interfaces/ITask";

let tasks: ITask[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

export class TaskService {
  static getTasks(userId: number): ITask[] {
    return tasks.filter(t => t.userId === userId);
  }

  static addTask(task: ITask): ITask {
    task.id = tasks.length + 1;
    tasks.push(task);
    saveTasks();
    return task;
  }

  static updateTask(id: number, updatedTask: Partial<ITask>): ITask | null {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, updatedTask);
    saveTasks();
    return task;
  }

  static deleteTask(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    saveTasks();
    return true;
  }
}