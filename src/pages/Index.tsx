import React from "react";
import { Room, Task } from "@/lib/types";
import { RoomCard } from "@/components/RoomCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";

const INITIAL_ROOMS: Room[] = [
  { id: "cuisine", name: "Cuisine", tasks: [] },
  { id: "salon", name: "Salon", tasks: [] },
  { id: "chambre", name: "Chambre", tasks: [] },
  { id: "sdb", name: "Salle de bain", tasks: [] },
];

const Index = () => {
  const [rooms, setRooms] = React.useState<Room[]>(INITIAL_ROOMS);

  const handleAddTask = (title: string, roomId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      urgent: false,
      room: roomId,
    };

    setRooms(rooms.map((room) =>
      room.id === roomId
        ? { ...room, tasks: [...room.tasks, newTask] }
        : room
    ));
  };

  const handleToggleTask = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })));
  };

  const handleDeleteTask = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.filter((task) => task.id !== taskId),
    })));
  };

  const handleToggleUrgent = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.map((task) =>
        task.id === taskId ? { ...task, urgent: !task.urgent } : task
      ),
    })));
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
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onToggleUrgent={handleToggleUrgent}
          />
        ))}
      </div>

      <AddTaskDialog
        rooms={rooms.map(({ id, name }) => ({ id, name }))}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Index;