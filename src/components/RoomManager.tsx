import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Room } from "@/lib/types";

interface RoomManagerProps {
  rooms: Room[];
  onAddRoom: (name: string) => void;
  onEditRoom: (id: string, name: string) => void;
  onDeleteRoom: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoomManager: React.FC<RoomManagerProps> = ({
  rooms,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  open,
  onOpenChange,
}) => {
  const [editingRoom, setEditingRoom] = React.useState<Room | null>(null);
  const [roomName, setRoomName] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom de pièce",
        variant: "destructive",
      });
      return;
    }

    if (editingRoom) {
      onEditRoom(editingRoom.id, roomName.trim());
      toast({
        title: "Pièce modifiée",
        description: "La pièce a été modifiée avec succès",
      });
    } else {
      onAddRoom(roomName.trim());
      toast({
        title: "Pièce ajoutée",
        description: "La pièce a été ajoutée avec succès",
      });
    }

    setRoomName("");
    setEditingRoom(null);
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (!open) {
      setEditingRoom(null);
      setRoomName("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ios-blue to-blue-600">
            {editingRoom ? "Modifier la pièce" : "Ajouter une pièce"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Nom de la pièce"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border-gray-200 focus:border-ios-blue/50 transition-all duration-200"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-ios-blue to-blue-500 hover:opacity-90 transition-all duration-200"
          >
            {editingRoom ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};