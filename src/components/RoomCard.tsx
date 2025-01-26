import React from "react";
import { Room } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import { TaskList } from "./TaskList";

interface RoomCardProps {
  room: Room;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleUrgent: (id: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onToggleTask,
  onDeleteTask,
  onToggleUrgent,
}) => {
  const progress = room.tasks.length
    ? (room.tasks.filter((t) => t.completed).length / room.tasks.length) * 100
    : 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{room.name}</h2>
        <ProgressCircle progress={progress} />
      </div>
      
      <TaskList
        tasks={room.tasks}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onToggleUrgent={onToggleUrgent}
      />
    </div>
  );
};