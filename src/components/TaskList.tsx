import React from "react";
import { Task } from "@/lib/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleUrgent: (id: string) => void;
}

export const TaskList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onToggleUrgent,
}: TaskListProps) => (
  <div className="space-y-2">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggleTask}
        onDelete={onDeleteTask}
        onToggleUrgent={onToggleUrgent}
      />
    ))}
  </div>
);