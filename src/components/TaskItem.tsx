import React from "react";
import { Task } from "@/lib/types";
import { Bell, Check, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleUrgent: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onToggleUrgent,
}) => {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          task.completed
            ? "bg-ios-green border-ios-green"
            : "border-gray-300 hover:border-ios-blue"
        )}
      >
        {task.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <span className={cn(
        "flex-1 text-sm transition-colors",
        task.completed && "text-gray-400 line-through"
      )}>
        {task.title}
      </span>

      <button
        onClick={() => onToggleUrgent(task.id)}
        className={cn(
          "p-1.5 rounded-full transition-colors",
          task.urgent ? "text-ios-red" : "text-gray-400 hover:text-ios-red"
        )}
      >
        <Bell className="w-4 h-4" />
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="p-1.5 rounded-full text-gray-400 hover:text-ios-red opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};