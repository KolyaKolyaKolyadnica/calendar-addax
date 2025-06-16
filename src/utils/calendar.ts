import type { CalendarDay, PublicHoliday } from "../types/calendar";

function getPrevMonthLastDays(
  year: number,
  month: number,
  startWeekDay: number
) {
  const result: CalendarDay[] = [];

  const prevMonth = new Date(year, month - 1, 1);
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startWeekDay - 1; i >= 0; i -= 1) {
    const date = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      prevMonthDays - i
    );
    result.push({ date, isCurrentMonth: false });
  }

  return result;
}

function getNextMonthFirstDays(
  year: number,
  month: number,
  currentDays: number
) {
  const result: CalendarDay[] = [];

  const totalCells = Math.ceil(currentDays / 7) * 7;
  const nextMonth = new Date(year, month + 1, 1);
  const nextMonthDayStart = 1;
  const daysToAdd = totalCells - currentDays;

  for (let i = 0; i < daysToAdd; i += 1) {
    result.push({
      date: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        nextMonthDayStart + i
      ),
      isCurrentMonth: false,
    });
  }

  return result;
}

export function generateCalendar(year: number, month: number): CalendarDay[] {
  const result: CalendarDay[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7; // TODO: Now: Mon=0, Sun=6, maybe toggle to Sun=0 Sat=6

  const prevMonthLastDays = getPrevMonthLastDays(year, month, startWeekDay);
  result.push(...prevMonthLastDays);

  for (let i = 1; i <= daysInMonth; i++) {
    result.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  const nextMonthFirrstDays = getNextMonthFirstDays(year, month, result.length);
  result.push(...nextMonthFirrstDays);

  return result;
}

const holidayCache = new Map<number, Set<PublicHoliday>>();

export async function fetchHolidaysForYear(
  year: number
): Promise<Set<PublicHoliday>> {
  if (holidayCache.has(year)) {
    return holidayCache.get(year)!;
  }

  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/UA`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch holidays for year ${year}`);
  }

  const data: PublicHoliday[] = await res.json();
  const holidays = new Set(data);

  holidayCache.set(year, holidays);

  return holidays;
}
