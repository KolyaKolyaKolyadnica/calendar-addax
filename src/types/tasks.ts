export type Task = {
  id: string;
  title: string;
};

export type DragItem = {
  type: string;
  task: Task;
  fromDate: string;
};

export const ItemTypes = {
  TASK: "task",
};
