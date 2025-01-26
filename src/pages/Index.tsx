import React from "react";
import { RoomCard } from "@/components/RoomCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { RoomManager } from "@/components/RoomManager";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useHomeManager } from "@/hooks/useHomeManager";

const Index = () => {
  const {
    rooms,
    addRoom,
    editRoom,
    deleteRoom,
    addTask,
    toggleTask,
    deleteTask,
    toggleUrgentTask,
  } = useHomeManager();

  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-ios-blue to-blue-600">
        Ma Maison
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onToggleUrgent={toggleUrgentTask}
            onEditRoom={() => {
              setIsRoomDialogOpen(true);
            }}
            onDeleteRoom={deleteRoom}
          />
        ))}
      </div>

      <AddTaskDialog
        rooms={rooms}
        onAddTask={addTask}
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
      />

      <RoomManager
        rooms={rooms}
        onAddRoom={addRoom}
        onEditRoom={editRoom}
        onDeleteRoom={deleteRoom}
        open={isRoomDialogOpen}
        onOpenChange={setIsRoomDialogOpen}
      />

      <FloatingActionButton
        onAddRoom={() => setIsRoomDialogOpen(true)}
        onAddTask={() => setIsTaskDialogOpen(true)}
      />
    </div>
  );
};

export default Index;