"use client";

import { useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority?: "Low" | "Medium" | "High";
  category?: "Personal" | "Business" | "Subtasks";
  tags?: string[];
  subtasks?: { id: string; title: string; completed: boolean }[];
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Research content ideas",
      completed: false,
      category: "Business",
    },
    {
      id: "2",
      title: "Create a database of guest authors",
      completed: false,
      category: "Business",
    },
    {
      id: "3",
      title: "Renew driver's license",
      description: "",
      dueDate: "11-03-23",
      completed: false,
      category: "Personal",
      tags: ["Tag 1"],
      subtasks: [{ id: "sub1", title: "Subtask", completed: false }],
    },
    {
      id: "4",
      title: "Consult accountant",
      completed: false,
      priority: "Low",
      category: "Business",
    },
    {
      id: "5",
      title: "Print business card",
      completed: false,
      category: "Business",
    },
  ]);

  const [selectedTaskId, setSelectedTaskId] = useState<string>("3");
  const [newTag, setNewTag] = useState<string>("");
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [newSubtask, setNewSubtask] = useState<string>("");
  const [isAddingSubtask, setIsAddingSubtask] = useState<boolean>(false);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

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
      {/* Task List */}
      <div className="w-full border-r md:w-1/3 lg:w-1/4">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-700">Today</h1>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
              {tasks.length}
            </span>
          </div>

          <Button
            variant="ghost"
            className="mb-4 flex w-full items-center justify-start gap-2 text-gray-500"
          >
            <Plus size={16} />
            <span>Add New Task</span>
          </Button>

          <div className="space-y-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`cursor-pointer rounded-md p-3 ${
                  selectedTaskId === task.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleTaskSelect(task.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{task.title}</h3>

                    {task.id === "3" && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>22-06-23</span>
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <Badge variant="outline" className="text-xs">
                          Subtasks
                        </Badge>
                        {task.category === "Personal" && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-xs"
                            >
                              Personal
                            </Badge>
                          </>
                        )}
                      </div>
                    )}

                    {task.id === "4" && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-xs"
                        >
                          Low
                        </Badge>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <Badge variant="outline" className="text-xs">
                          Business
                        </Badge>
                      </div>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Details */}
      {selectedTask && (
        <div className="flex-1 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Task:</h2>
            <p className="text-gray-900">{selectedTask.title}</p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Description:
            </h3>
            <Textarea
              placeholder="Add a description..."
              className="min-h-24 resize-none"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">List</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50">
                  Personal
                </Badge>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Due Date
              </h3>
              <Input className="h-8" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Tags</h3>
            <div className="flex flex-wrap items-center gap-2">
              {selectedTask.tags?.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50">
                  {tag}
                </Badge>
              ))}

              {isAddingTag ? (
                <div className="flex items-center gap-1">
                  <Input
                    onChange={(e) => setNewTag(e.target.value)}
                    className="h-7 w-24"
                    placeholder="Tag name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTag();
                      if (e.key === "Escape") setIsAddingTag(false);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setIsAddingTag(false)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setIsAddingTag(true)}
                >
                  + Add Tag
                </Button>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Subtasks:
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2 text-gray-500"
                onClick={() => setIsAddingSubtask(true)}
              >
                <Plus size={16} />
                <span>Add New Subtask</span>
              </Button>

              {isAddingSubtask && (
                <div className="flex items-center gap-2 pl-2">
                  <Input
                    onChange={(e) => setNewSubtask(e.target.value)}
                    className="h-8"
                    placeholder="Subtask name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSubtask();
                      if (e.key === "Escape") setIsAddingSubtask(false);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsAddingSubtask(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}

              {selectedTask.subtasks?.map((subtask) => (
                <div key={subtask.id} className="pl-2">
                  <p className="text-sm">{subtask.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex justify-between">
            <Button
              variant="outline"
              className="text-gray-500"
              onClick={handleDeleteTask}
            >
              Delete Task
            </Button>
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
