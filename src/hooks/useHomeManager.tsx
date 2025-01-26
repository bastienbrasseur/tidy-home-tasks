import { useState } from "react";
import { Room, Task } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export const useHomeManager = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast();

  const addRoom = (name: string) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name,
      tasks: [],
    };
    setRooms([...rooms, newRoom]);
    toast({
      title: "Pièce ajoutée",
      description: "La pièce a été ajoutée avec succès",
    });
  };

  const editRoom = (id: string, name: string) => {
    setRooms(rooms.map((room) =>
      room.id === id ? { ...room, name } : room
    ));
    toast({
      title: "Pièce modifiée",
      description: "La pièce a été modifiée avec succès",
    });
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id));
    toast({
      title: "Pièce supprimée",
      description: "La pièce a été supprimée avec succès",
    });
  };

  const addTask = (title: string, roomId: string) => {
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
    toast({
      title: "Tâche ajoutée",
      description: "La tâche a été ajoutée avec succès",
    });
  };

  const toggleTask = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })));
  };

  const deleteTask = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.filter((task) => task.id !== taskId),
    })));
  };

  const toggleUrgentTask = (taskId: string) => {
    setRooms(rooms.map((room) => ({
      ...room,
      tasks: room.tasks.map((task) =>
        task.id === taskId ? { ...task, urgent: !task.urgent } : task
      ),
    })));
  };

  return {
    rooms,
    addRoom,
    editRoom,
    deleteRoom,
    addTask,
    toggleTask,
    deleteTask,
    toggleUrgentTask,
  };
};