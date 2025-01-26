export type Task = {
  id: string;
  title: string;
  completed: boolean;
  urgent: boolean;
  room: string;
};

export type Room = {
  id: string;
  name: string;
  tasks: Task[];
};