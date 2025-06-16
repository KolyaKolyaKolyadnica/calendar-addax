import styled from "@emotion/styled";
import type { CalendarDay } from "../../types/calendar";

const Header = styled.div<{ isHoliday: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  color: ${({ isHoliday }) => {
    return isHoliday ? "white" : "black";
  }};
  font-weight: 600;
  font-size: 1rem;
  padding: 0 0.25rem;
`;
const Counters = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;
const Day = styled.div`
  font-weight: 600;
`;
const TasksCounter = styled.div<{ isHoliday: boolean }>`
  display: flex;
  font-size: 0.75rem;
  padding-bottom: 0.125rem;
  color: ${({ isHoliday }) => {
    return isHoliday ? "var(--color-gray-200)" : "var(--color-gray-500)";
  }};
`;
const HolidayContainer = styled.div`
  padding: 0.25rem;
  text-align: end;
  font-size: 0.8rem;
`;

type DayHeaderProps = {
  day: CalendarDay;
  taskCounter?: number;
};

export const DayHeader = ({ day, taskCounter }: DayHeaderProps) => {
  const isHoliday = !!day.holiday;

  return (
    <Header isHoliday={isHoliday}>
      <Counters>
        <Day>{day.date.getDate()}</Day>
        {!!taskCounter && (
          <TasksCounter isHoliday={isHoliday}>
            {taskCounter}-{taskCounter === 1 ? "card" : "cards"}
          </TasksCounter>
        )}
      </Counters>

      {day.holiday && <HolidayContainer>{day.holiday.name}</HolidayContainer>}
    </Header>
  );
};
