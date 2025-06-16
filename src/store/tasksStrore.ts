import { create } from "zustand";
import type { Task } from "../types/tasks";

interface TasksState {
  tasks: Record<string, Task[]>;
  editDay: string;
  searchBy: string;
  getTasks: () => Record<string, Task[]>;
  addTask: (key: string, newTask: Task) => void;
  editTask: (key: string, id: string, value: string) => void;
  removeTask: (key: string, id: string) => void;
  setTasksForDay: (dayKey: string, tasks: Task[]) => void;
  setEditDay: (key: string) => void;
  setSearchBy: (value: string) => void;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: {
    "2025-06-05": [{ id: "1", title: "wwwwwwwwww" }],
    "2025-06-04": [
      {
        id: "2",
        title:
          "fasdffsdaffsdfas da sad fdsa fsa fasdf asdf f safdw fsadf sda fdsafasdfasfsafdf fasdfasdfawww",
      },
    ],
    "2025-06-03": [{ id: "3", title: "test" }],
    "2025-06-02": [{ id: "4", title: "test" }],
    "2025-06-06": [
      { id: "5", title: "test #1" },
      { id: "6", title: "test #2" },
    ],
  },
  editDay: "",
  searchBy: "",

  setSearchBy: (value) => {
    set({ searchBy: value });
  },

  getTasks: () => {
    const tasks = get().tasks;
    const searchBy = get().searchBy.toLowerCase();

    const filteredEntries = Object.entries(tasks).map(([date, taskList]) => {
      const filtered = taskList.filter((task) =>
        task.title.toLowerCase().includes(searchBy)
      );
      return [date, filtered];
    });

    return Object.fromEntries(filteredEntries);
  },

  addTask: (key, newTask) => {
    const tasks = get().tasks;

    if (tasks[key]) {
      tasks[key].push(newTask);
    } else {
      tasks[key] = [newTask];
    }
  },

  editTask: (key, id, value) => {
    const tasks = get().tasks;
    const currentDayTasks = tasks[key];

    const updatedCurrentDayTasks = currentDayTasks.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return { ...task, title: value };
    });

    set({ tasks: { ...tasks, [key]: updatedCurrentDayTasks } });
  },

  removeTask: (key, id) => {
    const tasks = get().tasks;
    const updatedTasksForDay = tasks[key].filter((task) => task.id !== id);
    set({ tasks: { ...tasks, [key]: updatedTasksForDay } });
  },

  setTasksForDay: (dayKey, tasks) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [dayKey]: tasks,
      },
    }));
  },

  setEditDay: (key) => {
    set({ editDay: key });
  },
}));
