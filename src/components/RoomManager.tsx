import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HousePlus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Room } from "@/lib/types";

interface RoomManagerProps {
  rooms: Room[];
  onAddRoom: (name: string) => void;
  onEditRoom: (id: string, name: string) => void;
  onDeleteRoom: (id: string) => void;
}

export const RoomManager: React.FC<RoomManagerProps> = ({
  rooms,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
}) => {
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setRoomName(room.name);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    onDeleteRoom(id);
    toast({
      title: "Pièce supprimée",
      description: "La pièce a été supprimée avec succès",
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ios-blue to-blue-600">
          Pièces de la maison
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "bg-gradient-to-r from-ios-blue to-blue-500",
                "hover:opacity-90 transition-all duration-200"
              )}
              onClick={() => {
                setEditingRoom(null);
                setRoomName("");
              }}
            >
              <HousePlus className="h-5 w-5 mr-2" />
              Ajouter une pièce
            </Button>
          </DialogTrigger>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-4 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-ios-blue/20 transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{room.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(room)}
                  className="hover:text-ios-blue"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(room.id)}
                  className="hover:text-ios-red"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};