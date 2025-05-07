"use client";

import { useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskList } from "../components/TaskList";
import { TaskDetails } from "../components/TaskDetails";
import { Task } from "@/redux/calendar/task.slice";

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Research content ideas",
      content: "Research content ideas",
      description: "",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      priority: "LOW",
      status: "TODO"
    },
    {
      id: "2",
      title: "Create a database of guest authors",
      content: "Create a database of guest authors",
      description: "",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      priority: "LOW",
      status: "TODO"
    },
    {
      id: "3",
      title: "Renew driver's license",
      content: "Renew driver's license",
      description: "",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      priority: "LOW",
      status: "TODO"
    },
    {
      id: "4",
      title: "Consult accountant",
      content: "Consult accountant",
      description: "",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      priority: "LOW",
      status: "TODO"
    },
    {
      id: "5",
      title: "Print business card",
      content: "Print business card",
      description: "",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      priority: "LOW",
      status: "TODO"
    },
  ]);

  const [selectedTaskId, setSelectedTaskId] = useState<string>("3");
  const [newTag, setNewTag] = useState<string>("");
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [newSubtask, setNewSubtask] = useState<string>("");
  const [isAddingSubtask, setIsAddingSubtask] = useState<boolean>(false);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const handleAddTask = () => {
    const newTaskId = `new_${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      title: "Công việc mới",
      completed: false,
      category: "Personal",
    };

    setTasks([...tasks, newTask]);
    setSelectedTaskId(newTaskId);
  };

  const handleTaskSelect = (id: string) => {
    setSelectedTaskId(id);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === selectedTaskId
          ? { ...task, tags: [...(task.tags || []), newTag] }
          : task,
      ),
    );

    setNewTag("");
    setIsAddingTag(false);
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === selectedTaskId
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []),
                { id: `sub${Date.now()}`, title: newSubtask, completed: false },
              ],
            }
          : task,
      ),
    );

    setNewSubtask("");
    setIsAddingSubtask(false);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== selectedTaskId));
    setSelectedTaskId(tasks[0]?.id || "");
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    console.log("Saving changes for task:", selectedTask);
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-900 shadow-lg md:flex-row">
      <TaskList 
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onTaskSelect={handleTaskSelect}
      />
      
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onTitleChange={(title) => setTasks(tasks.map(t => t.id === selectedTaskId ? {...t, title} : t))}
          onDelete={handleDeleteTask}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
}
