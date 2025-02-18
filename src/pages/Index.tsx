import React from "react";
import { RoomCard } from "@/components/RoomCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { RoomManager } from "@/components/RoomManager";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useHomeManager } from "@/hooks/useHomeManager";
import { Room } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const { toast } = useToast();

  console.log("Current state:", { isRoomDialogOpen, isTaskDialogOpen, selectedRoom, rooms });

  const handleAddRoom = (name: string) => {
    addRoom(name);
    setIsRoomDialogOpen(false);
    setSelectedRoom(null);
    toast({
      title: "Succès",
      description: "La pièce a été ajoutée avec succès",
    });
  };

  const handleEditRoom = (room: Room) => {
    console.log("Edit room clicked:", room);
    setSelectedRoom(room);
    setIsRoomDialogOpen(true);
  };

  const handleEditRoomSubmit = (id: string, name: string) => {
    editRoom(id, name);
    setIsRoomDialogOpen(false);
    setSelectedRoom(null);
    toast({
      title: "Succès",
      description: "La pièce a été modifiée avec succès",
    });
  };

  const handleDeleteRoom = (id: string) => {
    deleteRoom(id);
    setSelectedRoom(null);
    toast({
      title: "Succès",
      description: "La pièce a été supprimée avec succès",
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsRoomDialogOpen(open);
    if (!open) {
      setSelectedRoom(null);
    }
  };

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
            onEditRoom={handleEditRoom}
            onDeleteRoom={handleDeleteRoom}
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
        onAddRoom={handleAddRoom}
        onEditRoom={handleEditRoomSubmit}
        onDeleteRoom={handleDeleteRoom}
        open={isRoomDialogOpen}
        onOpenChange={handleOpenChange}
        selectedRoom={selectedRoom}
      />

      <FloatingActionButton
        onAddRoom={() => {
          console.log("Add room button clicked");
          setIsRoomDialogOpen(true);
        }}
        onAddTask={() => {
          console.log("Add task button clicked");
          setIsTaskDialogOpen(true);
        }}
      />
    </div>
  );
};

export default Index;