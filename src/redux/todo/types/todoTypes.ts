export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Status = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
export type ItemType = "USER" | "SYSTEM" | string;
export type TaskTypeValue = "TASK" | "TODO" | string;

export interface Todo {
  id: string;
  parent?: string | null;
  type: ItemType;
  resourceId?: string | null;
  content: string;
  priority: Priority;
  description: string;
  startAt: string;
  dueAt: string;
  status: Status;
  taskType: TaskTypeValue;
}

export interface CreateTodoPayload {
  parent?: string | null;
  resourceId?: string | null;
  content: string;
  priority: Priority;
  description: string;
  startAt: string;
  dueAt: string;
  status: Status;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}