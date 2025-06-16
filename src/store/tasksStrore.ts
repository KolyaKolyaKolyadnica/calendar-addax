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

/**
 * These constants are only for example purposes
 * and to provide sample task descriptions in the calendar.
 */
const TODAY = new Date().toLocaleDateString("en-CA");
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const TOMORROW = tomorrowDate.toLocaleDateString("en-CA");

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: {
    [TODAY]: [
      { id: "1", title: "Hi! This is my test task." },
      {
        id: "2",
        title:
          "These are hardcoded tasks just as an example. I added some next steps that weren’t mentioned in the Required Functionality, but I think they are required or at least will be nice to have.",
      },
    ],
    [TOMORROW]: [
      { id: "3", title: "Save data (DB, localStorage, or something similar)" },
      { id: "4", title: "Change country setting" },
      { id: "5", title: "See more in the README..." },
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
