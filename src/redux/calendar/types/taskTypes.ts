export type Task = {
  id: string;
  title: string;
  content: string;
  description: string;
  start: string;
  end: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
};

export interface TaskResponse {
  id: string;
  content: string;
  description: string;
  startAt: string;
  dueAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
}

export type TaskState = {
  tasks: Task[];
  loading: boolean;
};