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
    <div 
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl",
        "bg-white/50 hover:bg-white shadow-sm hover:shadow-md",
        "transition-all duration-200 ease-in-out transform hover:-translate-y-0.5",
        "border border-transparent hover:border-ios-blue/20"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          task.completed
            ? "bg-ios-green border-ios-green scale-105"
            : "border-gray-300 hover:border-ios-blue hover:scale-105"
        )}
      >
        {task.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <span 
        className={cn(
          "flex-1 text-sm transition-all duration-200",
          task.completed ? "text-gray-400 line-through" : "text-gray-700"
        )}
      >
        {task.title}
      </span>

      <button
        onClick={() => onToggleUrgent(task.id)}
        className={cn(
          "p-1.5 rounded-full transition-all duration-200 hover:scale-110",
          task.urgent ? "text-ios-red" : "text-gray-400 hover:text-ios-red"
        )}
      >
        <Bell className="w-4 h-4" />
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className={cn(
          "p-1.5 rounded-full text-gray-400 hover:text-ios-red",
          "opacity-0 group-hover:opacity-100 transition-all duration-200",
          "hover:scale-110"
        )}
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};