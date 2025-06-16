import { create } from "zustand";

interface CalendarState {
  currentDate: Date;

  setDate: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),

  setDate: (date) => set({ currentDate: date }),

  nextMonth: () => {
    const date = get().currentDate;
    const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    set({ currentDate: next });
  },

  prevMonth: () => {
    const date = get().currentDate;
    const prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    set({ currentDate: prev });
  },
}));
