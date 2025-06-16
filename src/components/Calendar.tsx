import styled from "@emotion/styled";
import { DayCell } from "./DayCell/DayCell";
import { fetchHolidaysForYear, generateCalendar } from "../utils/calendar";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";
import { useCalendarStore } from "../store/calendarStore";
import { useEffect, useState } from "react";
import type { CalendarDay } from "../types/calendar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  background: #ccc;
  padding: 0 0.5rem 1rem 0.5rem;
`;
const DayName = styled.div`
  color: black;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Calendar = () => {
  const date = useCalendarStore((state) => state.currentDate);

  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    setDays(generateCalendar(date.getFullYear(), date.getMonth()));
    updateCalendar();

    async function updateCalendar() {
      try {
        const holidays = await fetchHolidaysForYear(date.getFullYear());

        const holidayMap = new Map(
          Array.from(holidays).map((holiday) => [holiday.date, holiday])
        );

        setDays((prev) => {
          const updated = prev.map((day) => {
            const iso = day.date.toLocaleDateString("en-CA");
            const holiday = holidayMap.get(iso);

            return {
              ...day,
              holiday,
            };
          });

          return updated;
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [date]);

  return (
    <Container>
      <SettingsPanel />
      <CalendarGrid>
        {dayNames.map((name, index) => (
          <DayName key={index}>{name}</DayName>
        ))}
        {days.map((day, index) => (
          <DayCell key={index} day={day} />
        ))}
      </CalendarGrid>
    </Container>
  );
};
