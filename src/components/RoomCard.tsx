import React from "react";
import { Room } from "@/lib/types";
import { ProgressCircle } from "./ProgressCircle";
import { TaskList } from "./TaskList";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface RoomCardProps {
  room: Room;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleUrgent: (id: string) => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (id: string) => void;
}

export const RoomCard = ({
  room,
  onToggleTask,
  onDeleteTask,
  onToggleUrgent,
  onEditRoom,
  onDeleteRoom,
}: RoomCardProps) => {
  const progress = React.useMemo(() => 
    room.tasks.length
      ? (room.tasks.filter((t) => t.completed).length / room.tasks.length) * 100
      : 0,
    [room.tasks]
  );

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm border-transparent hover:border-ios-blue/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            {room.name}
          </h2>
          <div className="flex items-center gap-2">
            <ProgressCircle progress={progress} />
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditRoom(room)}
                className="hover:text-ios-blue"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteRoom(room.id)}
                className="hover:text-ios-red"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
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