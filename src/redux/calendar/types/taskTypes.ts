export type Task = {
  id: string;
  title: string;
  content: string;
  description: string;
  start: string;
  end: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  taskType: "TASK";
};

export interface TaskResponse {
  content: string;
  description: string;
  startAt: string;
  dueAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  taskType: "TASK";
}

export type TaskState = {
  tasks: Task[];
  loading: boolean;
};