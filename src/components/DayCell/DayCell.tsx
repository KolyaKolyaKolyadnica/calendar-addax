import styled from "@emotion/styled";
import type { CalendarDay } from "../../types/calendar";
import { useTasksStore } from "../../store/tasksStrore";
import { DayHeader } from "./DayHeader";
import { DayContent } from "./DayContent";

const Container = styled.div<{
  isToday: boolean;
  isCurrentMonth: boolean;
  isHoliday: boolean;
}>`
  background: ${({ isCurrentMonth, isHoliday }) => {
    if (isHoliday) {
      return "green";
    }
    return isCurrentMonth ? "white" : "gray";
  }};
  color: black;
  padding: 0.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  outline: ${({ isToday }) => {
    return isToday ? "4px solid var(--color-gray-600)" : "";
  }};
`;

type DayCellProps = {
  day: CalendarDay;
};

export const DayCell = ({ day }: DayCellProps) => {
  const tasksStore = useTasksStore((state) => state);

  const keyDate = day.date.toLocaleDateString("en-CA");
  const tasks = tasksStore.getTasks();
  const currentTasks = tasks[keyDate];

  const now = new Date();
  const isToday =
    now.toLocaleDateString("en-CA") === day.date.toLocaleDateString("en-CA");

  return (
    <Container
      isToday={isToday}
      isCurrentMonth={day.isCurrentMonth}
      isHoliday={!!day.holiday}
    >
      <DayHeader day={day} taskCounter={currentTasks?.length} />
      <DayContent day={day} />
    </Container>
  );
};
