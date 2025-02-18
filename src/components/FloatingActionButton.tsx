import React from "react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onAddRoom: () => void;
  onAddTask: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onAddRoom,
  onAddTask,
}) => {
  console.log("FloatingActionButton rendered");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full",
            "bg-gradient-to-r from-ios-blue to-blue-500",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "border-none outline-none"
          )}
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={(e) => {
            e.preventDefault();
            console.log("Add room menu item clicked");
            onAddRoom();
          }} 
          className="cursor-pointer"
        >
          Ajouter une pièce
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={(e) => {
            e.preventDefault();
            console.log("Add task menu item clicked");
            onAddTask();
          }} 
          className="cursor-pointer"
        >
          Ajouter une tâche
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};