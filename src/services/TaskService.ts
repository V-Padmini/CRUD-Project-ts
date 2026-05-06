import type { ITask } from "../interfaces/ITask";

const TASKS_KEY = "tasks";

export class TaskService {
  static getTasks(): ITask[] {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveTasks(tasks: ITask[]) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  static addTask(task: ITask): ITask {
    task.id = Date.now();
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  }

  static updateTask(id: number, updated: Partial<ITask>): ITask | null {
    const tasks = this.getTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...updated };
    this.saveTasks(tasks);
    return tasks[idx];
  }

  static deleteTask(id: number): boolean {
    const tasks = this.getTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    this.saveTasks(newTasks);
    return tasks.length !== newTasks.length;
  }
}