import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AddTaskDialogProps {
  rooms: { id: string; name: string }[];
  onAddTask: (title: string, room: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  rooms,
  onAddTask,
  open,
  onOpenChange,
}) => {
  const [title, setTitle] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedRoom) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    onAddTask(title.trim(), selectedRoom);
    setTitle("");
    setSelectedRoom("");
    onOpenChange(false);
    toast({
      title: "Tâche ajoutée",
      description: "La tâche a été ajoutée avec succès",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ios-blue to-blue-600">
            Ajouter une tâche
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Nom de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-200 focus:border-ios-blue/50 transition-all duration-200"
          />
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger className="border-gray-200 focus:border-ios-blue/50 transition-all duration-200">
              <SelectValue placeholder="Sélectionner une pièce" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            type="submit" 
            className={cn(
              "w-full bg-gradient-to-r from-ios-blue to-blue-500",
              "hover:opacity-90 transition-all duration-200"
            )}
          >
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};