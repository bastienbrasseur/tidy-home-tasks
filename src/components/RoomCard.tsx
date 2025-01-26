import React from "react";
import { Room } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import { TaskList } from "./TaskList";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm border-transparent hover:border-ios-blue/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            {room.name}
          </h2>
          <ProgressCircle progress={progress} />
        </div>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={room.tasks}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onToggleUrgent={onToggleUrgent}
        />
      </CardContent>
    </Card>
  );
};